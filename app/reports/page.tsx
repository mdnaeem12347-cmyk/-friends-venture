import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "../lib/supabase";

export default async function ReportsPage() {
  const { count: members } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  const { data: deposits } = await supabase
    .from("deposits")
    .select("*")
    .order("id", { ascending: false });

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .order("id", { ascending: false });

  const { data: bankTransactions } = await supabase
    .from("bank_transactions")
    .select("*")
    .order("id", { ascending: false });

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
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Reports
          </h1>

          <div className="grid gap-6 md:grid-cols-4 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Total Members</p>
              <h2 className="text-4xl font-bold text-blue-700 mt-2">
                {members ?? 0}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Total Savings</p>
              <h2 className="text-4xl font-bold text-green-600 mt-2">
                BDT {totalSavings.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Total Expenses</p>
              <h2 className="text-4xl font-bold text-red-600 mt-2">
                BDT {totalExpenses.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Current Balance</p>
              <h2 className="text-4xl font-bold text-blue-700 mt-2">
                BDT {currentBalance.toLocaleString()}
              </h2>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                Recent Deposits
              </h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Member</th>
                    <th className="text-left p-2">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {deposits?.slice(0, 5).map((d) => (
                    <tr key={d.id} className="border-b">
                      <td className="p-2">{d.member_id}</td>
                      <td className="p-2">
                        BDT {Number(d.savings_amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                Recent Expenses
              </h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Purpose</th>
                    <th className="text-left p-2">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses?.slice(0, 5).map((e) => (
                    <tr key={e.id} className="border-b">
                      <td className="p-2">{e.purpose}</td>
                      <td className="p-2">
                        BDT {Number(e.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Recent Bank Transactions
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Reference</th>
                </tr>
              </thead>

              <tbody>
                {bankTransactions?.slice(0, 5).map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="p-2">{t.transaction_date}</td>
                    <td className="p-2">{t.transaction_type}</td>
                    <td className="p-2">
                      BDT {Number(t.amount).toLocaleString()}
                    </td>
                    <td className="p-2">{t.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}