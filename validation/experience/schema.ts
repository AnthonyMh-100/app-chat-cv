import { z } from "zod";

export const experienceSchema = z.object({
  position: z.string().trim().min(1, "El puesto es obligatorio."),

  company: z.string().trim().min(1, "La empresa es obligatoria."),

  location: z.string().trim().optional(),

  modality: z.string().trim().optional(),

  startDate: z.string().trim().min(1, "La fecha de inicio es obligatoria."),

  endDate: z.string().trim().optional(),

  current: z.boolean(),

  description: z.string().trim().optional(),

  responsibilities: z.string().trim().optional(),

  achievements: z.string().trim().optional(),

  technologies: z.array(z.string().trim()).default([]),
});
