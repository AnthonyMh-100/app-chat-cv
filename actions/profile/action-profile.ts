"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/utils/profile";
import { profileSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export type GeneralState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function profileAction(
  _: GeneralState,
  formData: FormData,
): Promise<GeneralState> {
  try {
    const { user } = (await auth()) || {};

    const data = Object.fromEntries(formData.entries());

    const result = profileSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: "Corrige los campos del formulario.",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { data: profileData } = result;
    const userId = Number(user!.id);

    const existingProfile = await prisma.profile.findFirst({
      where: { userId },
    });

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: profileData,
      });
    } else {
      await prisma.profile.create({
        data: {
          ...profileData,
          userId,
        },
      });
    }

    revalidatePath("/settings");

    return {
      success: true,
      message: "Información guardada correctamente.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ocurrió un error al guardar la información.",
    };
  }
}

export const getProfileAction = async (): Promise<GeneralState> => {
  try {
    const { user } = (await auth()) || {};

    const userProfile = await prisma.profile.findFirst({
      where: { userId: Number(user!.id) },
    });

    if (!userProfile) {
      return {
        success: true,
        data: null,
      };
    }

    const { id, name, surname, email, phone, location, linkedin, github, website, profile } = userProfile;

    return {
      success: true,
      data: {
        id,
        name,
        surname,
        email,
        phone,
        location,
        linkedin,
        github,
        website,
        profile,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Ocurrió un error al obtener la información.",
    };
  }
};

export const getCompletedProfile = async () => {
  const { user } = (await getSessionUser()) || {};
  const profile = await prisma.profile.findUnique({
    where: {
      userId: Number(user!.id),
    },
    include: {
      experiences: true,
      educations: true,
      projects: true,
      skills: true,
      languages: true,
    },
  });

  return profile;
};