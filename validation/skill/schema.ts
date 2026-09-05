import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().trim().min(1, "La habilidad es obligatoria."),
});