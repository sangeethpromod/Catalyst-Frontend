"use client"
import React from "react";
import WorkspaceUX from "@/components/Logic/workspaceUX";
import Sidebar from "@/components/Layout/Sidebar";

export default function WorkspacePage() {
  return (
    <div className="flex min-h-svh w-full items-center bg-black">
      <Sidebar />
      <div className="flex-1 h-screen transition-all duration-200">
        <div className="w-full h-[7vh] border-b border-stone-800 flex items-center px-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#be123c] to-white bg-clip-text text-transparent">
            Cognitive AI-Driven Tactical Allocation Lifecycle Yield Strategy Tool (Catalyst)
          </h1>
        </div>
  <div className="w-full h-[93vh] overflow-y-auto workspace-scrollbar">
          <WorkspaceUX />
        </div>
      </div>
    </div>
  );
}
