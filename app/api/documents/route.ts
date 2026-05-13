import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import {
  documentUploadSchema,
  documentStatusUpdateSchema,
} from "../../../lib/validation/document";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const parsed = documentUploadSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Upload failed" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
  }

  if (file.size > 1 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 1MB" }, { status: 400 });
  }

  if (session.user.role === "EMPLOYEE" && session.user.email !== normalizedEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const employee = await prisma.employee.findFirst({
    where: { email: normalizedEmail },
    select: { id: true, status: true },
  });

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  if (employee.status === "INACTIVE") {
    return NextResponse.json(
      { error: "Your account is inactive. Contact admin." },
      { status: 403 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const cleanedName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
  const filename = `${Date.now()}-${cleanedName || "document"}`;
  const absoluteFilePath = path.join(uploadsDir, filename);
  const relativeFilePath = `uploads/${filename}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await writeFile(absoluteFilePath, fileBuffer);

  const doc = await prisma.document.create({
    data: {
      employeeId: employee.id,
      filePath: relativeFilePath,
      status: "PENDING",
      uploadedBy: session.user.email,
    },
  });

  await prisma.auditLog.create({
    data: {
      userEmail: session.user.email,
      action: "DOCUMENT_UPLOADED",
      entity: "Document",
      entityId: doc.id,
    },
  });

  return NextResponse.json(doc, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;

  if (role === "ADMIN" || role === "MANAGER") {
    const docs = await prisma.document.findMany({
      where: {
        employee: {
          status: "ACTIVE",
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        employee: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(docs);
  }

  const employee = await prisma.employee.findFirst({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!employee) {
    return NextResponse.json([]);
  }

  const docs = await prisma.document.findMany({
    where: { employeeId: employee.id },
    orderBy: { createdAt: "desc" },
    include: {
      employee: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  return NextResponse.json(docs);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;
  if (role !== "ADMIN" && role !== "MANAGER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = documentStatusUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { id, status, reason } = parsed.data;

  if (status === "REJECTED" && !reason) {
    return NextResponse.json(
      { error: "Rejection reason is required" },
      { status: 400 }
    );
  }

  const updated = await prisma.document.update({
    where: { id },
    data: {
      status,
      rejectionReason: status === "REJECTED" ? reason : null,
    },
  });

  await prisma.auditLog.create({
    data: {
      userEmail: session.user.email,
      action: status === "APPROVED" ? "DOCUMENT_APPROVED" : "DOCUMENT_REJECTED",
      entity: "Document",
      entityId: updated.id,
    },
  });

  return NextResponse.json(updated);
}

