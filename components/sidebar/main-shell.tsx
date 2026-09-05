"use client";

import { useState } from "react";
import clsx from "clsx";
import { Sidebar } from "./Sidebar";

interface MainShellProps {
  children: React.ReactNode;
  userName?: string | null;
}

export const MainShell = ({ children, userName }: MainShellProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((current) => !current)}
        userName={userName}
      />
      <main
        className={clsx(
          "min-h-screen transition-all duration-200",
          collapsed ? "ml-16" : "ml-60",
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainShell;
