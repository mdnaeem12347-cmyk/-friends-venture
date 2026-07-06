"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Wallet,
  Building2,
  Receipt,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", href: "/" },
  { icon: Users, name: "Members", href: "/members" },
  { icon: Wallet, name: "Monthly Deposits", href: "/deposits" },
  { icon: Receipt, name: "Expenses", href: "/expenses" },
  { icon: Building2, name: "Bank Transactions", href: "/bank-transactions" },
  { icon: FileText, name: "Deposit Slips", href: "/deposit-slips" },
  { icon: BarChart3, name: "Reports", href: "/reports" },
  { icon: Settings, name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-800 text-white px-4 py-4 shadow">
        <div>
          <h1 className="text-lg font-bold">Friends Venture</h1>
        </div>

        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen
          bg-blue-800 text-white
          shadow-xl
          transition-all duration-300
          flex flex-col
          ${collapsed ? "w-20" : "w-72"}
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="border-b border-blue-700 px-5 py-5 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">Friends Venture</h1>
              <p className="text-xs text-blue-200">
                Financial Management
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              className="hidden md:flex hover:bg-blue-700 rounded-lg p-2"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            <button
              className="md:hidden hover:bg-blue-700 rounded-lg p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {menu.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : ""}
                className={`
                  flex items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-200
                  group
                  ${
                    active
                      ? "bg-white text-blue-800 font-semibold shadow-md"
                      : "hover:bg-blue-700"
                  }
                `}
              >
                <item.icon className="shrink-0" size={20} />

                {!collapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-blue-700 p-4">
          {!collapsed ? (
            <>
              <p className="text-sm font-medium">
                Friends Venture
              </p>
              <p className="text-xs text-blue-200">
                Financial Management System
              </p>
              <p className="mt-2 text-xs text-blue-300">
                Version 1.0.0
              </p>
            </>
          ) : (
            <div className="text-center text-xs text-blue-300">
              v1.0
            </div>
          )}
        </div>
      </aside>
    </>
  );
}