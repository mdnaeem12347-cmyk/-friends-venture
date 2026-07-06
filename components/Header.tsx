"use client";

import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Plus,
  UserCircle2,
} from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/members": "Members",
  "/deposits": "Monthly Deposits",
  "/expenses": "Expenses",
  "/bank-transactions": "Bank Transactions",
  "/deposit-slips": "Deposit Slips",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Header() {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ||
    pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Dashboard";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {today}
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Action */}
          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-white hover:bg-blue-800 transition">
            <Plus size={18} />
            <span className="hidden md:inline">
              Quick Add
            </span>
          </button>

          {/* Notifications */}
          <button className="relative rounded-xl border border-gray-300 p-2.5 hover:bg-gray-100 transition">
            <Bell size={20} />

            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-3 py-2">
            <UserCircle2
              size={38}
              className="text-blue-700"
            />

            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Friends Venture
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}