"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Wallet,
  Building2,
  Receipt,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      href: "/",
    },
    {
      icon: Users,
      name: "Members",
      href: "/members",
    },
    {
      icon: Wallet,
      name: "Monthly Deposits",
      href: "/deposits",
    },
    {
      icon: Receipt,
      name: "Expenses",
      href: "/expenses",
    },
    {
      icon: Building2,
      name: "Bank Transactions",
      href: "/bank-transactions",
    },
    {
      icon: FileText,
      name: "Deposit Slips",
      href: "/deposit-slips",
    },
    {
      icon: BarChart3,
      name: "Reports",
      href: "/reports",
    },
    {
      icon: Settings,
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-blue-800 text-white shadow-xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold">
          Friends Venture
        </h1>

        <p className="text-blue-200 text-sm">
          Financial Management System
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                active
                  ? "bg-white text-blue-800 font-semibold shadow"
                  : "hover:bg-blue-700"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-6 text-center text-xs text-blue-200">
        Version 1.0
      </div>
    </aside>
  );
}