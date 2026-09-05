import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  tool,
  jsonSchema,
  stepCountIs,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";
import { SYSTEM } from "@/constants/constants";
import { getUserProfile, adaptedCurriculum } from "@/tools/tools";
import { actionConversationMessagesCreate } from "@/actions/chat/action-chat";

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google("gemini-3.1-flash-lite"),
    system: SYSTEM,
    prompt: modelMessages,
    tools: {
      getUserProfile,
      adaptedCurriculum,
      url_context: google.tools.urlContext({}),
    },
    onStart: async (response) => {
      const messagesConversation = response.messages
        ?.filter(({ role }) => ["user", "assistant"].includes(role))
        .map(({ role, content }) => {
          let contentConversation = content;

          if (Array.isArray(content)) {
            contentConversation = content
              .map(({ text }: any) => text)
              .join(" ");
          }
          return {
            role,
            text: contentConversation,
          };
        });

      await actionConversationMessagesCreate({
        messages: messagesConversation,
        status: "start",
        conversationId,
      });
    },
    onEnd: async (response) => {
      const { text } = response;
      const contentFinalIA = {
        role: "assistant",
        text,
      };

      await actionConversationMessagesCreate({
        messages: [contentFinalIA],
        status: "end",
        conversationId,
      });
    },
    stopWhen: stepCountIs(5),
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: "medium",
        },
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
