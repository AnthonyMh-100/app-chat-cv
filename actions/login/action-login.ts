"use server";

import { signIn, signOut } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { generateHashPassword } from "@/utils/utils";
import { registerSchema, loginSchema } from "@/validation";

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
export type LoginState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerAction(
  _: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  try {
    const data = Object.fromEntries(formData.entries());

    const result = registerSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: "Corrige los campos del formulario.",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { fullName, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "El correo ya se encuentra registrado.",
        errors: {
          email: ["Este correo ya está registrado."],
        },
      };
    }

    const hashPassword = await generateHashPassword(password);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashPassword,
      },
    });

    await signIn("credentials", {
      fullName,
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "Cuenta creada correctamente.",
    };
  } catch (error) {
    console.error("Register Action Error:", error);

    return {
      success: false,
      message: "Ocurrió un error al crear la cuenta. Inténtalo nuevamente.",
    };
  }
}

export async function loginAction(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Corrige los campos del formulario.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "Inicio de sesión correcto.",
    };
  } catch {
    return {
      success: false,
      message: "El correo o la contraseña son incorrectos.",
    };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
