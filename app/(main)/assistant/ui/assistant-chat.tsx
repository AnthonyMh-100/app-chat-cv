"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { useState } from "react";
import {
  IoAddOutline,
  IoSendOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import ButtonConversation from "./button/button-conversation";
import { DefaultChatTransport } from "ai";

interface AssistantChatProps {
  conversationId: string;
  messagesHistory: UIMessage[];
}

export default function AssistantChat({
  conversationId,
  messagesHistory,
}: AssistantChatProps) {
  const { messages, status, sendMessage, id } = useChat({
    ...(conversationId && { id: conversationId }),
    messages: messagesHistory,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { conversationId },
    }),
  });
  const [input, setInput] = useState("");
  const handleSend = () => {
    const message = input.trim();
    if (!message) return;
    sendMessage({
      text: message,
    });
    setInput("");
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
            <ButtonConversation title="Nuevo chat" />
          </div>
        </header>
        <main className="flex-1 py-8">
          <div className="space-y-6">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <div
                  key={message.id}
                  className={
                    isAssistant ? "flex items-start gap-3" : "flex justify-end"
                  }
                >
                  {isAssistant && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
                      <IoSparklesOutline size={15} className="text-[#3a3a3c]" />
                    </div>
                  )}

                  <div
                    className={[
                      "max-w-170",
                      isAssistant ? "" : "flex flex-col items-end",
                    ].join(" ")}
                  >
                    <span className="mb-1.5 text-[11px] font-medium text-[#888888]">
                      {isAssistant ? "Asistente" : "Tú"}
                    </span>

                    <div
                      className={[
                        "rounded-xl px-4 py-3",
                        isAssistant
                          ? "rounded-tl-sm bg-[#f7f7f7]"
                          : "rounded-tr-sm bg-[#0a0a0a]",
                      ].join(" ")}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type !== "text") return null;

                        return (
                          <p
                            key={index}
                            className={[
                              "whitespace-pre-line text-sm leading-6",
                              isAssistant ? "text-[#3a3a3c]" : "text-white",
                            ].join(" ")}
                          >
                            {part.text}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <footer className="sticky bottom-0 bg-white py-5">
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Escribe un mensaje..."
                className="min-h-11 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 text-[#0a0a0a] outline-none placeholder:text-[#a8a8aa]"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || status === "streaming"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0a0a0a] text-white transition hover:bg-[#3a3a3c] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <IoSendOutline size={15} />
              </button>
            </div>
            <div className="px-3 pb-1 pt-2">
              <p className="text-[10px] text-[#a8a8aa]">
                La IA utilizará la información profesional que tienes
                registrada.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
