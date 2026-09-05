import React from "react";
import AssistantChat from "../ui/assistant-chat";
import AssistantRequiredProfile from "../ui/assistant-required-profile";
import { getMessagesConversationAction } from "@/actions/chat/action-chat";
import { getProfileAction } from "@/actions/profile/action-profile";

const AssistantPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const conversationParam = await params;

  const { data: personal } = await getProfileAction();

  if (!personal) {
    return <AssistantRequiredProfile />;
  }

  const messages = await getMessagesConversationAction({
    conversationId: conversationParam?.id,
  });

  return (
    <AssistantChat
      conversationId={conversationParam?.id}
      messagesHistory={messages}
    />
  );
};

export default AssistantPage;
