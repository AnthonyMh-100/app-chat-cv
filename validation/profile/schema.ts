import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  surname: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
  email: z.email("Ingresa un correo válido."),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z
    .string()
    .url("Ingresa una URL válida.")
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Ingresa una URL válida.")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Ingresa una URL válida.")
    .optional()
    .or(z.literal("")),
  profile: z.string().max(1000, "El perfil es demasiado largo.").optional(),
});
