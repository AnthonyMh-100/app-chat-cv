"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/utils/profile";
import { educationSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function educationAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");
    const data = {
      degree: formData.get("degree"),
      institution: formData.get("institution"),
      location: formData.get("location"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      current: formData.get("current") === "on",
      description: formData.get("description"),
    };

    const result = educationSchema.safeParse(data);

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

    const { data: educationData } = result;

    if (id) {
      await prisma.education.update({
        where: { id: Number(id) },
        data: educationData,
      });
    } else {
      await prisma.education.create({
        data: {
          profileId: userProfile!.id,
          ...educationData,
        },
      });
    }

    revalidatePath("/settings");

    return {
      success: true,
      message: "Educación guardada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar la educación.",
    };
  }
}

export const getEducationAction = async (): Promise<GeneralState> => {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return {
        success: true,
        data: [],
      };
    }

    const { id: profileId } = profile;
    const education = await prisma.education.findMany({
      where: { profileId },
    });

    return {
      success: true,
      message: "Educación obtenida correctamente.",
      data: education,
    };
  } catch (error) {
    return {
      success: true,
      data: [],
    };
  }
};

export async function deleteEducationAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");

    if (!id) {
      return {
        success: false,
        message: "ID de educación requerido.",
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

    await prisma.education.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Educación eliminada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al eliminar la educación.",
    };
  }
}