"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "../lib/supabase";

export default function BankTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const [transactionDate, setTransactionDate] = useState("");
  const [transactionType, setTransactionType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  async function loadTransactions() {
    const { data } = await supabase
      .from("bank_transactions")
      .select("*")
      .order("id", { ascending: false });

    setTransactions(data || []);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function saveTransaction() {
    if (!transactionDate || !amount || !reference) {
      alert("Please fill all fields.");
      return;
    }

    const transactionId = "TRX-" + Date.now();

    const { error } = await supabase
      .from("bank_transactions")
      .insert({
        transaction_id: transactionId,
        transaction_date: transactionDate,
        transaction_type: transactionType,
        amount: Number(amount),
        reference,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Transaction Saved Successfully");

    setTransactionDate("");
    setTransactionType("Deposit");
    setAmount("");
    setReference("");

    loadTransactions();
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-4 md:p-6">

          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Bank Transactions
          </h1>

          {/* Form */}

          <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="date"
                className="border rounded-lg p-3 w-full"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />

              <select
                className="border rounded-lg p-3 w-full"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option>Deposit</option>
                <option>Withdraw</option>
              </select>

              <input
                type="number"
                placeholder="Amount"
                className="border rounded-lg p-3 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="text"
                placeholder="Reference / Remarks"
                className="border rounded-lg p-3 w-full"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />

            </div>

            <button
              onClick={saveTransaction}
              className="mt-5 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Transaction
            </button>

          </div>

          {/* Table */}

          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="min-w-[850px] w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-3 text-left">Transaction ID</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Reference</th>
                </tr>

              </thead>

              <tbody>

                {transactions.map((t) => (

                  <tr key={t.id} className="border-b">

                    <td className="p-3">
                      {t.transaction_id}
                    </td>

                    <td className="p-3">
                      {t.transaction_date}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          t.transaction_type === "Deposit"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.transaction_type}
                      </span>
                    </td>

                    <td className="p-3 font-semibold">
                      BDT {Number(t.amount).toLocaleString()}
                    </td>

                    <td className="p-3">
                      {t.reference}
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