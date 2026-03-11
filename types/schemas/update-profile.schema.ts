import z from "zod";

export const updateProfileSchema = z.object({
  id: z.string(),
  companyName: z.string().min(1, "Empresa deve ser informado."),
  accountResponsible: z.string().min(1, "Responsável deve ser informado."),
  contactNumber: z.string().min(1, "Número para contato deve ser informado."),
  email: z.string().min(1, "E-mail deve ser informado."),
  companyDocument: z.string(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
