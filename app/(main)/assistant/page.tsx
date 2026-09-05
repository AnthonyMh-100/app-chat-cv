import React from "react";
import AssistantView from "./ui/assistant-view";
import AssistantRequiredProfile from "./ui/assistant-required-profile";
import { getProfileAction } from "@/actions/profile/action-profile";

export const AssistantPage = async () => {
  const { data: personal } = await getProfileAction();

  if (!personal) {
    return <AssistantRequiredProfile />;
  }

  return <AssistantView />;
};

export default AssistantPage;
