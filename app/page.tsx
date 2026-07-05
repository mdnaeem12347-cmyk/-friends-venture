import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "./lib/supabase";

export default async function Home() {
  const { count: members } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  const { data: deposits } = await supabase
    .from("deposits")
    .select("savings_amount");

  const { data: expenses } = await supabase
    .from("expenses")
    .select("amount");

  const totalSavings =
    deposits?.reduce(
      (sum, item) => sum + Number(item.savings_amount || 0),
      0
    ) || 0;

  const totalExpenses =
    expenses?.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    ) || 0;

  const currentBalance = totalSavings - totalExpenses;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Total Members</p>
              <h2 className="mt-2 text-4xl font-bold text-blue-700">
                {members ?? 0}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Total Savings</p>
              <h2 className="mt-2 text-4xl font-bold text-green-600">
                BDT {totalSavings.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Total Expenses</p>
              <h2 className="mt-2 text-4xl font-bold text-red-600">
                BDT {totalExpenses.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Current Balance</p>
              <h2 className="mt-2 text-4xl font-bold text-blue-700">
                BDT {currentBalance.toLocaleString()}
              </h2>
            </div>

          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Friends Venture Financial Management System
            </h3>

            <p className="text-gray-600">
              Dashboard is connected to Supabase and displays live data.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}