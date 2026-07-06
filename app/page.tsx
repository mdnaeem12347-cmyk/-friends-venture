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
    <div className="md:flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 w-full">
        <Header />

        <main className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Total Members
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-blue-700">
                {members ?? 0}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Total Savings
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-green-600 break-words">
                BDT {totalSavings.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Total Expenses
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-red-600 break-words">
                BDT {totalExpenses.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Current Balance
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-blue-700 break-words">
                BDT {currentBalance.toLocaleString()}
              </h2>
            </div>

          </div>

          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl md:text-2xl font-bold text-blue-700 mb-3">
              Friends Venture Financial Management System
            </h3>

            <p className="text-gray-600 leading-7">
              Dashboard is connected to Supabase and displays live data.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}