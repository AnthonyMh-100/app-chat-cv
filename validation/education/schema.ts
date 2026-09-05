import { z } from "zod";

export const educationSchema = z.object({
  degree: z.string().trim().min(1, "El título es obligatorio."),
  institution: z.string().trim().min(1, "La institución es obligatoria."),
  location: z.string().trim().optional(),
  startDate: z.string().trim().min(1, "La fecha de inicio es obligatoria."),
  endDate: z.string().trim().optional(),
  current: z.boolean(),
  description: z.string().trim().optional(),
});