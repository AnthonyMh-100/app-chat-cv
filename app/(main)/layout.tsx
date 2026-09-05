import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { MainShell } from "@/components/";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <MainShell>{children}</MainShell>;
};

export default MainLayout;
