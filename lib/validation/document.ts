import { z } from "zod";

export const documentUploadSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine((v) => v.toLowerCase().endsWith("@gmail.com"), {
      message: "Invalid gmail address",
    }),
});

export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;

export const documentStatusUpdateSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
  status: z.enum(["APPROVED", "REJECTED"]),
  reason: z.string().trim().optional(),
});

export type DocumentStatusUpdateInput = z.infer<
  typeof documentStatusUpdateSchema
>;

