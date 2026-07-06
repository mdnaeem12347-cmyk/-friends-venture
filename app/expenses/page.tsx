"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "../lib/supabase";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);

  const [expenseDate, setExpenseDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  async function loadExpenses() {
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("id", { ascending: false });

    setExpenses(data || []);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function saveExpense() {
    if (!expenseDate || !purpose || !amount || !paidBy) {
      alert("Please fill all fields.");
      return;
    }

    const expenseId = "EXP-" + Date.now();

    const { error } = await supabase.from("expenses").insert({
      expense_id: expenseId,
      expense_date: expenseDate,
      purpose,
      amount: Number(amount),
      paid_by: paidBy,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense Saved Successfully");

    setExpenseDate("");
    setPurpose("");
    setAmount("");
    setPaidBy("");

    loadExpenses();
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-4 md:p-6">

          <h1 className="text-3xl font-bold text-red-600 mb-6">
            Expenses
          </h1>

          {/* Expense Form */}

          <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="date"
                className="border rounded-lg p-3 w-full"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Purpose"
                className="border rounded-lg p-3 w-full"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />

              <input
                type="number"
                placeholder="Amount"
                className="border rounded-lg p-3 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="text"
                placeholder="Paid By"
                className="border rounded-lg p-3 w-full"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              />

            </div>

            <button
              onClick={saveExpense}
              className="mt-5 w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              Save Expense
            </button>

          </div>

          {/* Expense Table */}

          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="min-w-[850px] w-full">

              <thead className="bg-red-600 text-white">

                <tr>
                  <th className="p-3 text-left">Expense ID</th>
                  <th className="p-3 text-left">Purpose</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Paid By</th>
                  <th className="p-3 text-left">Date</th>
                </tr>

              </thead>

              <tbody>

                {expenses.map((expense) => (

                  <tr key={expense.id} className="border-b">

                    <td className="p-3">
                      {expense.expense_id}
                    </td>

                    <td className="p-3">
                      {expense.purpose}
                    </td>

                    <td className="p-3 font-semibold text-red-600">
                      BDT {Number(expense.amount).toLocaleString()}
                    </td>

                    <td className="p-3">
                      {expense.paid_by}
                    </td>

                    <td className="p-3">
                      {expense.expense_date}
                    </td>

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