"use client"
import React from "react";
import { PanelLeftClose, Command, Bot, ChartScatter, Settings } from 'lucide-react';
import Logo from "../../../public/Logos/logo.svg"
import Image from "next/image";

interface SidebarProps {
  expandedWidth?: number;
  collapsedWidth?: number;
}

export default function Sidebar({ 
  expandedWidth = 200, 
  collapsedWidth = 60 
}: SidebarProps) {
  const [sidebarWidth, setSidebarWidth] = React.useState(expandedWidth);
  const [collapsed, setCollapsed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  function toggleSidebar() {
    setCollapsed((prev) => {
      const next = !prev;
      setSidebarWidth(next ? collapsedWidth : expandedWidth);
      return next;
    });
  }

  return (
    <div
      className="h-screen border-r border-stone-800 relative flex flex-col items-center justify-between group"
      style={{ width: sidebarWidth, transition: 'width 0.2s' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo and toggle button container */}
      <div className="w-full relative pt-3 pb-4 flex items-center justify-center">
        {/* Logo - fades out on hover */}
        <div className={`transition-opacity duration-200 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}>
          {collapsed ? (
            <Image 
              src={Logo} 
              alt="Logo" 
              width={40} 
              height={40}
              className="transition-all duration-200"
            />
          ) : (
            <Image 
              src={Logo} 
              alt="Logo" 
              width={40} 
              height={40}
              className="transition-all duration-200"
            />
          )}
        </div>

        {/* Toggle button - shows on hover, overlays logo */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded  p-3  transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 20 }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeftClose 
            className={`transition-transform duration-200 text-white ${collapsed ? "rotate-180" : ""}`} 
            size={24}
          />
        </button>
      </div>

      {/* Sidebar navigation */}
      <div className="flex-1 w-full flex flex-col pt-4">
        <nav className="flex flex-col gap-2 px-2">
          {/* Workspace */}
          <button className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 transition-colors group/item ${collapsed ? 'justify-center' : ''}`}>
            <Command className="text-[#be123c] group-hover/item:text-white transition-colors flex-shrink-0" size={26} strokeWidth={1.8} />
            {!collapsed && <span className="text-stone-200 group-hover/item:text-white transition-colors font-medium">Workspace</span>}
          </button>

          {/* Agent */}
          <button className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 transition-colors group/item ${collapsed ? 'justify-center' : ''}`}>
            <Bot className="text-stone-200 group-hover/item:text-white transition-colors flex-shrink-0" size={20} strokeWidth={1.8} />
            {!collapsed && <span className="text-stone-200 group-hover/item:text-white transition-colors font-medium">Agent</span>}
          </button>

          {/* Workflow */}
          <button className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 transition-colors group/item ${collapsed ? 'justify-center' : ''}`}>
            <ChartScatter className="text-stone-200 group-hover/item:text-white transition-colors flex-shrink-0" size={20} strokeWidth={1.8} />
            {!collapsed && <span className="text-stone-200 group-hover/item:text-white transition-colors font-medium">Workflow</span>}
          </button>
        </nav>
      </div>

      {/* Settings at bottom */}
      <div className="w-full pb-4 px-2">
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 transition-colors group/item ${collapsed ? 'justify-center' : ''}`}>
          <Settings className="text-stone-200 group-hover/item:text-white transition-colors flex-shrink-0" size={26} strokeWidth={1.8} />
          {!collapsed && <span className="text-stone-200 group-hover/item:text-white transition-colors font-medium">Settings</span>}
        </button>
      </div>
    </div>
  );
}

// Export hook to get sidebar width for parent component
export function useSidebarWidth() {
  const [sidebarWidth, setSidebarWidth] = React.useState(300);
  return { sidebarWidth, setSidebarWidth };
}
