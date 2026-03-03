import z from "zod";

export const updateUserProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  document: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().optional(),
});

export type UpdataUserProfileFormData = z.infer<typeof updateUserProfileSchema>;
