import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    email: z.email("Ingresa un correo válido."),
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

export const loginSchema = z.object({
  email: z.email("Ingresa un correo válido."),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
