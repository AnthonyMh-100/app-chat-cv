import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

export async function getSessionUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado.");
  }

  return session;
}
export async function getCurrentUserProfile() {
  const session = await getSessionUser();

  const profile = await prisma.profile.findFirst({
    where: {
      userId: Number(session?.user!.id),
    },
  });

  if (!profile) {
    throw new Error("No se encontró el perfil del usuario.");
  }

  return profile;
}
