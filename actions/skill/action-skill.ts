"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/utils/profile";
import { skillSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function skillAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const data = {
      name: formData.get("name"),
    };

    const result = skillSchema.safeParse(data);

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

    const { data: skillData } = result;

    await prisma.skill.create({
      data: {
        profileId: userProfile!.id,
        ...skillData,
      },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Habilidad guardada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar la habilidad.",
    };
  }
}

export const getSkillAction = async (): Promise<GeneralState> => {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return {
        success: true,
        data: [],
      };
    }

    const { id: profileId } = profile;
    const skills = await prisma.skill.findMany({
      where: { profileId },
    });

    return {
      success: true,
      message: "Habilidades obtenidas correctamente.",
      data: skills,
    };
  } catch (error) {
    return {
      success: true,
      data: [],
    };
  }
};

export async function deleteSkillAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");

    if (!id) {
      return {
        success: false,
        message: "ID de habilidad requerido.",
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

    await prisma.skill.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Habilidad eliminada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al eliminar la habilidad.",
    };
  }
}