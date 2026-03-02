import z from "zod"

export const updateCompanyUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  position: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().optional(),
})

export type UpdateCompanyUserSchemaFormData = z.infer<typeof updateCompanyUserSchema>
