"use client";

import { actionConversationCreate } from "@/actions/chat/action-chat";
import { useRouter } from "next/navigation";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

interface ButtonProps {
  title: string;
}

const ButtonConversation = ({ title }: ButtonProps) => {
  const router = useRouter();
  const handleNewChat = async () => {
    const { data } = (await actionConversationCreate()) || {};
    if (!data?.id) return;

    router.push(`/assistant/${data?.id}`);
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={handleNewChat}
      className="cursor-pointer flex items-center gap-2 rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm font-medium text-[#3a3a3c] transition hover:bg-[#f7f7f7]"
    >
      <IoAddOutline size={16} />
      {title}
    </button>
  );
};

export default ButtonConversation;
