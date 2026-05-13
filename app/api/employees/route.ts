import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import {
  employeeSchema,
  employeeUpdateSchema,
} from "../../../lib/validation/employee";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() ?? "";
  const pageParam = Number(searchParams.get("page"));
  const limitParam = Number(searchParams.get("limit"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
  const limit =
    Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(Math.floor(limitParam), 100)
      : 10;
  const skip = (page - 1) * limit;

  const where: Prisma.EmployeeWhereInput = search
    ? {
        status: "ACTIVE",
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { department: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [employees, totalCount] = await prisma.$transaction([
    prisma.employee.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.employee.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return NextResponse.json({
    employees,
    totalCount,
    page,
    totalPages,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();

  const parseResult = employeeSchema.safeParse(json);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parseResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { name, email, department, status } = parseResult.data;
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedDepartment = department.trim();

  const existingInDepartment = await prisma.employee.findFirst({
    where: { email: normalizedEmail, department: normalizedDepartment },
    select: { id: true },
  });

  if (existingInDepartment) {
    return NextResponse.json(
      { error: "Employee already exists in this department" },
      { status: 409 }
    );
  }

  let employee;
  try {
    employee = await prisma.employee.create({
      data: {
        name,
        email: normalizedEmail,
        department: normalizedDepartment,
        status: status ?? "ACTIVE",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Employee with this email already exists" },
        { status: 409 }
      );
    }
    throw error;
  }

  await prisma.auditLog.create({
    data: {
      userEmail: session.user.email,
      action: "EMPLOYEE_CREATED",
      entity: "Employee",
      entityId: employee.id,
    },
  });

  return NextResponse.json(employee, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parseResult = employeeUpdateSchema.safeParse(json);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parseResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { id, name, email, department } = parseResult.data;
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedDepartment = department.trim();

  const existingInDepartment = await prisma.employee.findFirst({
    where: {
      email: normalizedEmail,
      department: normalizedDepartment,
      NOT: { id },
    },
    select: { id: true },
  });

  if (existingInDepartment) {
    return NextResponse.json(
      { error: "Employee already exists in this department" },
      { status: 409 }
    );
  }

  try {
    const updated = await prisma.employee.update({
      where: { id },
      data: {
        name,
        email: normalizedEmail,
        department: normalizedDepartment,
      },
    });

    await prisma.auditLog.create({
      data: {
        userEmail: session.user.email,
        action: "EMPLOYEE_UPDATED",
        entity: "Employee",
        entityId: updated.id,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Employee with this email already exists" },
          { status: 409 }
        );
      }
    }
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const id =
    typeof json === "object" && json !== null && "id" in json
      ? (json as { id?: string }).id
      : undefined;

  if (!id) {
    return NextResponse.json({ error: "Employee id is required" }, { status: 400 });
  }

  try {
    const updated = await prisma.employee.update({
      where: { id },
      data: { status: "INACTIVE" },
    });

    await prisma.auditLog.create({
      data: {
        userEmail: session.user.email,
        action: "EMPLOYEE_DEACTIVATED",
        entity: "Employee",
        entityId: updated.id,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }
    throw error;
  }
}