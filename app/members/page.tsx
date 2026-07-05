"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddMemberModal from "@/components/AddMemberModal";
import { supabase } from "../lib/supabase";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("member_id");

    if (error) {
      alert(error.message);
      return;
    }

    setMembers(data || []);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  async function deleteMember(id: number) {
    const ok = confirm("Delete this member?");

    if (!ok) return;

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Member deleted successfully.");

    loadMembers();
  }

  const filteredMembers = members.filter((member) =>
    member.member_name.toLowerCase().includes(search.toLowerCase()) ||
    member.member_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">
              Members
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Member
            </button>
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Search member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-3 w-full md:w-80"
            />
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-3 text-left">Member ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Join Date</th>
                  <th className="p-3 text-left">Monthly Deposit</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredMembers.map((member) => (

                  <tr key={member.id} className="border-b">

                    <td className="p-3">{member.member_id}</td>

                    <td className="p-3">{member.member_name}</td>

                    <td className="p-3">{member.join_date}</td>

                    <td className="p-3">
                      BDT {Number(member.monthly_deposit).toLocaleString()}
                    </td>

                    <td className="p-3">{member.status}</td>

                    <td className="p-3 text-center">

                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteMember(member.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

        <AddMemberModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={loadMembers}
        />

      </div>
    </div>
  );
}