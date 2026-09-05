"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/utils/profile";
import { languageSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function languageAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");
    const data = {
      language: formData.get("language"),
      level: formData.get("level"),
    };

    const result = languageSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: "Corrige los campos del formulario.",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const userProfile = await prisma.profile.findFirst({
      where: { userId: Number(user!.id) },
    });

    if (!userProfile) {
      return {
        success: false,
        message: "No se encontro el perfil para el usuario.",
      };
    }

    const { data: languageData } = result;

    if (id) {
      await prisma.language.update({
        where: { id: Number(id) },
        data: languageData,
      });
    } else {
      await prisma.language.create({
        data: {
          profileId: userProfile!.id,
          ...languageData,
        },
      });
    }

    revalidatePath("/settings");

    return {
      success: true,
      message: "Idioma guardado correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar el idioma.",
    };
  }
}

export const getLanguageAction = async (): Promise<GeneralState> => {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return {
        success: true,
        data: [],
      };
    }

    const { id: profileId } = profile;
    const languages = await prisma.language.findMany({
      where: { profileId },
    });

    return {
      success: true,
      message: "Idiomas obtenidos correctamente.",
      data: languages,
    };
  } catch (error) {
    return {
      success: true,
      data: [],
    };
  }
};

export async function deleteLanguageAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");

    if (!id) {
      return {
        success: false,
        message: "ID de idioma requerido.",
      };
    }

    const userProfile = await prisma.profile.findFirst({
      where: { userId: Number(user!.id) },
    });

    if (!userProfile) {
      return {
        success: false,
        message: "No se encontro el perfil para el usuario.",
      };
    }

    await prisma.language.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Idioma eliminado correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al eliminar el idioma.",
    };
  }
}