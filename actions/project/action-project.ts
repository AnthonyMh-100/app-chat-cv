"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/utils/profile";
import { projectSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function projectAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      technologies: String(formData.get("technologies") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      repository: formData.get("repository"),
      website: formData.get("website"),
    };

    const result = projectSchema.safeParse(data);

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

    const { data: projectData } = result;

    if (id) {
      await prisma.project.update({
        where: { id: Number(id) },
        data: projectData,
      });
    } else {
      await prisma.project.create({
        data: {
          profileId: userProfile!.id,
          ...projectData,
        },
      });
    }

    revalidatePath("/settings");

    return {
      success: true,
      message: "Proyecto guardado correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar el proyecto.",
    };
  }
}

export const getProjectAction = async (): Promise<GeneralState> => {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return {
        success: true,
        data: [],
      };
    }

    const { id: profileId } = profile;
    const projects = await prisma.project.findMany({
      where: { profileId },
    });

    return {
      success: true,
      message: "Proyectos obtenidos correctamente.",
      data: projects,
    };
  } catch (error) {
    return {
      success: true,
      data: [],
    };
  }
};

export async function deleteProjectAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};
    const id = formData.get("id");

    if (!id) {
      return {
        success: false,
        message: "ID de proyecto requerido.",
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

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Proyecto eliminado correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al eliminar el proyecto.",
    };
  }
}