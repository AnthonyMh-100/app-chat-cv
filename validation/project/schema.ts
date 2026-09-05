import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio."),
  description: z.string().trim().min(1, "La descripción es obligatoria."),
  technologies: z.array(z.string().trim()).default([]),
  repository: z
    .string()
    .url("Ingresa una URL válida.")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Ingresa una URL válida.")
    .optional()
    .or(z.literal("")),
});