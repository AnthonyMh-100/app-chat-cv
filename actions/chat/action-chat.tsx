"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/utils/profile";
import moment from "moment";
import { revalidatePath } from "next/cache";

interface MessagesProps {
  role: string;
  text: any;
}

interface ConversationProps {
  status?: string;
  conversationId: string;
  messages: MessagesProps[];
}

export const actionConversationCreate = async () => {
  try {
    const { user } = await getSessionUser();
    const conversation = await prisma.conversation.create({
      data: {
        userId: Number(user!.id),
      },
    });

    return {
      success: true,
      message: "Conversacion creada correctamente.",
      data: conversation,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Ocurrió un error al crear la conversacion.",
    };
  }
};

export const actionConversationMessagesCreate = async ({
  messages,
  status,
  conversationId,
}: ConversationProps) => {
  try {
    const { user } = await getSessionUser();

    const [conversation] = await prisma.$transaction([
      prisma.conversation.findFirst({
        where: { userId: Number(user!.id), id: conversationId },
        include: {
          messages: true,
        },
      }),
    ]);

    if (!conversation) {
      return {
        success: false,
        message: "No existe conversacion para este ususario.",
        data: [],
      };
    }
    const messageTotal = conversation.messages?.length;

    const currentMessage = messages.map(({ role, text }) => ({
      role,
      content: text,
      conversationId,
    }));
    const messagesFormatted =
      status === "start" ? currentMessage.slice(messageTotal) : currentMessage;

    const messagesByConversation = await prisma.message.createMany({
      data: messagesFormatted,
    });

    revalidatePath(`/assistant/${conversation?.id}`);

    return {
      success: true,
      message: "Los mensajes se obtuvieron correctamente.",
      data: messagesByConversation,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Ocurrió un error al crear la conversacion.",
    };
  }
};

export const getMessagesConversationAction = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const messages = await prisma.message.findMany({
    where: { conversationId },
  });

  return messages.map(({ id, role, content }) => ({
    id: String(id),
    role: role as "user" | "assistant" | "system",
    parts: [
      {
        type: "text" as const,
        text: content,
      },
    ],
  }));
};

export const getConversationAction = async () => {
  const { user } = await getSessionUser();

  const conversations = await prisma.conversation.findMany({
    where: { userId: Number(user!.id) },
  });

  return conversations.map(({ id, createdAt }) => ({
    id,
    createdAt: moment(createdAt).format("DD/MM/YYYY"),
  }));
};

export const deleteConversationAction = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const { user } = await getSessionUser();

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: Number(user!.id),
      },
      select: {
        id: true,
      },
    });

    if (!conversation) {
      return {
        success: false,
        message: "La conversación no existe.",
      };
    }

    await prisma.conversation.delete({
      where: {
        id: conversation.id,
      },
    });

    const nextConversation = await prisma.conversation.findFirst({
      where: {
        userId: Number(user!.id),
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
      },
    });

    return {
      success: true,
      nextConversationId: nextConversation?.id ?? null,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "No se pudo eliminar la conversación.",
    };
  }
};

export const createCurriculumAction = async ({ curriculum }: any) => {
  const { user } = await getSessionUser();

  const {
    id,
    experiences,
    educations,
    projects,
    skills,
    languages,
    ...curriculumData
  } = curriculum;

  const curriculumInfo = await prisma.curriculum.create({
    data: {
      ...curriculumData,
      userId: Number(user!.id),

      experiences: {
        create: experiences.map((experience: any) => ({
          position: experience.position,
          company: experience.company,
          location: experience.location,
          modality: experience.modality,
          startDate: experience.startDate,
          endDate: experience.endDate,
          current: experience.current,
          description: experience.description,
          responsibilities: experience.responsibilities,
          achievements: experience.achievements,
          technologies: experience.technologies,
        })),
      },

      educations: {
        create: educations.map((education: any) => ({
          degree: education.degree,
          institution: education.institution,
          location: education.location,
          startDate: education.startDate,
          endDate: education.endDate,
          current: education.current,
          description: education.description,
        })),
      },

      projects: {
        create: projects.map((project: any) => ({
          name: project.name,
          description: project.description,
          technologies: project.technologies,
          repository: project.repository,
          website: project.website,
        })),
      },

      skills: {
        create: skills.map((skill: any) => ({
          name: skill.name,
        })),
      },

      languages: {
        create: languages.map((language: any) => ({
          language: language.language,
          level: language.level,
        })),
      },
    },
  });

  return curriculumInfo;
};

export const getAdaptedCurriculumsAction = async () => {
  const { user } = await getSessionUser();

  const curriculums = await prisma.curriculum.findMany({
    where: {
      userId: Number(user!.id),
      vacancy: {
        not: null,
      },
    },
    include: {
      experiences: true,
      educations: true,
      projects: true,
      skills: true,
      languages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return curriculums;
};

export const getCurriculumByIdAction = async (id: number) => {
  const { user } = await getSessionUser();

  const curriculum = await prisma.curriculum.findFirst({
    where: {
      id,
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

  return {
    data: curriculum,
  };
};
