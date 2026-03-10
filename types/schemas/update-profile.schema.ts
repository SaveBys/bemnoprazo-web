import z from "zod";

export const updateProfileSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().optional(),
  accountResponsible: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().optional(),
  companyDocument: z.string().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
