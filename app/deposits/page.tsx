"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "../lib/supabase";

export default function DepositsPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);

  const [memberId, setMemberId] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [depositMonth, setDepositMonth] = useState("");
  const [amount, setAmount] = useState("");

  async function loadData() {
    const { data: membersData } = await supabase
      .from("members")
      .select("*")
      .order("member_id");

    setMembers(membersData || []);

    const { data: depositData } = await supabase
      .from("deposits")
      .select("*")
      .order("id", { ascending: false });

    setDeposits(depositData || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveDeposit() {
    if (!memberId || !depositDate || !depositMonth || !amount) {
      alert("Please fill all fields.");
      return;
    }

    // Check duplicate deposit
    const { data: existing } = await supabase
      .from("deposits")
      .select("id")
      .eq("member_id", memberId)
      .eq("deposit_month", depositMonth)
      .maybeSingle();

    if (existing) {
      alert("This member has already paid for this month.");
      return;
    }

    const depositId = "DEP-" + Date.now();

    const { error } = await supabase
      .from("deposits")
      .insert({
        deposit_id: depositId,
        member_id: memberId,
        deposit_date: depositDate,
        deposit_month: depositMonth,
        savings_amount: Number(amount),
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deposit saved successfully.");

    setMemberId("");
    setDepositDate("");
    setDepositMonth("");
    setAmount("");

    loadData();
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Monthly Deposits
          </h1>

          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <select
                className="border rounded-lg p-3"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              >
                <option value="">Select Member</option>

                {members.map((m) => (
                  <option key={m.id} value={m.member_id}>
                    {m.member_id} - {m.member_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="border rounded-lg p-3"
                value={depositDate}
                onChange={(e) => setDepositDate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Deposit Month"
                className="border rounded-lg p-3"
                value={depositMonth}
                onChange={(e) => setDepositMonth(e.target.value)}
              />

              <input
                type="number"
                placeholder="Savings Amount"
                className="border rounded-lg p-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              onClick={saveDeposit}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Deposit
            </button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Deposit ID</th>
                  <th className="p-3 text-left">Member</th>
                  <th className="p-3 text-left">Month</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {deposits.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="p-3">{d.deposit_id}</td>

                    <td className="p-3">{d.member_id}</td>

                    <td className="p-3">{d.deposit_month}</td>

                    <td className="p-3">
                      BDT {Number(d.savings_amount).toLocaleString()}
                    </td>

                    <td className="p-3">{d.deposit_date}</td>
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