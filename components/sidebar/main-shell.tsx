"use client";

import { useState } from "react";
import clsx from "clsx";
import { Sidebar } from "./Sidebar";

interface MainShellProps {
  children: React.ReactNode;
}

export const MainShell = ({ children }: MainShellProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((current) => !current)}
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
