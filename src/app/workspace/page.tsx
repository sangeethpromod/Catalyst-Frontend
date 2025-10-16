"use client"
import React from "react";
import { Expand } from "lucide-react";
import WorkspaceUX from "@/components/Logic/workspaceUX";

export default function WorkspacePage() {
  const expandedWidth = 300;
  const collapsedWidth = 60;
  const [sidebarWidth, setSidebarWidth] = React.useState(expandedWidth);
  const [collapsed, setCollapsed] = React.useState(false);

  function toggleSidebar() {
    setCollapsed((prev) => {
      const next = !prev;
      setSidebarWidth(next ? collapsedWidth : expandedWidth);
      return next;
    });
  }

  return (
    <div className="flex min-h-svh w-full items-center bg-black">
      <div
        className="h-screen border-r border-stone-800 relative flex flex-col items-center justify-between"
        style={{ width: sidebarWidth, transition: 'width 0.2s' }}
      >
        {/* Sidebar content here */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-2 bg-stone-900 rounded p-1 hover:bg-stone-800 transition-colors"
          style={{ zIndex: 20 }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Expand className={collapsed ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      </div>
      <div
        className="h-screen transition-all duration-200"
        style={{ width: `calc(100% - ${sidebarWidth}px)` }}
      >
        <div className="w-full h-[7vh] border-b border-stone-800"></div>
  <div className="w-full h-[93vh] overflow-y-auto workspace-scrollbar">
          <WorkspaceUX />
        </div>
      </div>
    </div>
  );
}
