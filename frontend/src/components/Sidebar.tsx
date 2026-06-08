"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Ticket,
  ClipboardList,
  Bot,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Ticket",
      href: "/create-ticket",
      icon: Ticket,
    },
    {
      name: "My Tickets",
      href: "/my-tickets",
      icon: ClipboardList,
    },
    {
      name: "AI Assistant",
      href: "/ai-assistant",
      icon: Bot,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          AI Service Desk
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Workforce Automation
        </p>
      </div>

      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition-all
              ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}