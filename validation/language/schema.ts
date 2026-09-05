import { z } from "zod";

export const languageSchema = z.object({
  language: z.string().trim().min(1, "El idioma es obligatorio."),
  level: z.enum(["Básico", "Intermedio", "Avanzado", "Nativo"], {
    message: "Selecciona un nivel válido.",
  }),
});