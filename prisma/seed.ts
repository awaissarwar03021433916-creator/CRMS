import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@crms.com" },
    update: {
      password,
      role: Role.ADMIN,
      department: "Management",
    },
    create: {
      name: "Admin",
      email: "admin@crms.com",
      password,
      role: Role.ADMIN,
      department: "Management",
    },
  });

  console.log("Admin user ensured:", admin.email);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });