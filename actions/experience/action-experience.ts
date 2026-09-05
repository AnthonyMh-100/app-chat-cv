"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/utils/profile";
import { experienceSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function experienceAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");
    const data = {
      position: formData.get("position"),
      company: formData.get("company"),
      location: formData.get("location"),
      modality: formData.get("modality"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      current: formData.get("current") === "on",
      description: formData.get("description"),
      responsibilities: formData.get("responsibilities"),
      achievements: formData.get("achievements"),
      technologies: String(formData.get("technologies") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const result = experienceSchema.safeParse(data);

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

    const { data: experienceData } = result;

    if (id) {
      await prisma.experience.update({
        where: { id: Number(id) },
        data: experienceData,
      });
    } else {
      await prisma.experience.create({
        data: {
          profileId: userProfile!.id,
          ...experienceData,
        },
      });
    }

    revalidatePath("/settings");

    return {
      success: true,
      message: "Experiencia guardada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar la experiencia.",
    };
  }
}

export const getExperienceAction = async (): Promise<GeneralState> => {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return {
        success: false,
        data: [],
      };
    }

    const { id: profileId } = profile;
    const experience = await prisma.experience.findMany({
      where: { profileId },
    });

    return {
      success: true,
      message: "Experiencia obtenida correctamente.",
      data: experience,
    };
  } catch (error) {
    return {
      success: true,
      data: [],
    };
  }
};

export async function deleteExperienceAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");

    if (!id) {
      return {
        success: false,
        message: "Id de experiencia requerido.",
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

    await prisma.experience.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Experiencia eliminada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al eliminar la experiencia.",
    };
  }
}
