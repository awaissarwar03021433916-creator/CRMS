import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((v) => v.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),
  department: z.enum(["HR", "IT", "LAW", "STAFF", "CEO"]),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;

export const employeeUpdateSchema = z.object({
  id: z.string().uuid("Invalid employee id"),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((v) => v.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),
  department: z.enum(["HR", "IT", "LAW", "STAFF", "CEO"]),
});

export type EmployeeUpdateInput = z.infer<typeof employeeUpdateSchema>;