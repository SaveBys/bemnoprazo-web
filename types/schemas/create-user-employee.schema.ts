import z from "zod"

export const createUserEmployeeSchema = z.object({
  name: z.string().min(1, "Nome deve ser informado."),
  position: z.string().min(1, "Cargo deve ser informado."),
  contactNumber: z.string().min(1, "Número de contato deve ser informado."),
  document: z.string().min(1, "CPF deve ser informado."),
  email: z.string().min(1, "E-mail deve ser informado."),
})

export type CreateUserEmployeeFormData = z.infer<typeof createUserEmployeeSchema>
