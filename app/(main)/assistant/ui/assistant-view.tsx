"use client";

import { actionConversationCreate } from "@/actions/chat/action-chat";
import { useRouter } from "next/navigation";
import { IoAddOutline, IoSparklesOutline } from "react-icons/io5";
import ButtonConversation from "./button/button-conversation";

export default function AssistantView() {
  const router = useRouter();
  const handleNewChat = async () => {
    const { data } = (await actionConversationCreate()) || {};
    if (!data?.id) return;

    router.push(`/assistant/${data?.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-225 flex-col px-6">
        <header className="border-b border-[#ededed] py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a0a0a]">
                <IoSparklesOutline
                  size={17}
                  strokeWidth={1.8}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-[15px] font-semibold text-[#0a0a0a]">
                  Asistente IA
                </h1>

                <p className="mt-0.5 text-xs text-[#888888]">
                  Adapta tu CV según la vacante a la que quieres postular.
                </p>
              </div>
            </div>

            <ButtonConversation title="Nuevo Chat" />
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f7f7]">
              <IoSparklesOutline size={26} className="text-[#00B48A]" />
            </div>

            <h2 className="text-lg font-semibold text-[#0a0a0a]">
              Comienza una nueva conversación
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#888888]">
              Crea un nuevo chat para comenzar a adaptar tu CV a una vacante
              específica o resolver cualquier duda sobre tu perfil profesional.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
