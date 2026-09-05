import { tool } from "ai";
import { string, success, z } from "zod";
import { getCompletedProfile } from "@/actions/profile/action-profile";
import { createCurriculumAction } from "@/actions/chat/action-chat";

export const getUserProfile = tool({
  description:
    "Obtiene la información profesional completa del usuario autenticado para analizar o adaptar su CV.",

  inputSchema: z.object({}),

  execute: async () => {
    const profile = await getCompletedProfile();
    return profile;
  },
});

export const adaptedCurriculum = tool({
  description:
    "Adapta el CV del usuario para una vacante. Puede modificar la información de experiencia laboral, educación, proyectos, habilidades e idiomas según los datos proporcionados por el usuario y la vacante.",
  inputSchema: z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    vacancy: z.string(),

    experiences: z.array(
      z.object({
        position: z.string(),
        company: z.string(),
        location: z.string().optional(),
        modality: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        current: z.boolean(),
        description: z.string().optional(),
        responsibilities: z.string().optional(),
        achievements: z.string().optional(),
        technologies: z.array(z.string()),
      }),
    ),

    educations: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        current: z.boolean(),
        description: z.string().optional(),
      }),
    ),

    projects: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        repository: z.string().optional(),
        website: z.string().optional(),
      }),
    ),

    skills: z.array(
      z.object({
        name: z.string(),
      }),
    ),

    languages: z.array(
      z.object({
        language: z.string(),
        level: z.string(),
      }),
    ),
  }),

  execute: async (data) => {
    await createCurriculumAction({
      curriculum: data,
    });

    return {
      success: true,
    };
  },
});
