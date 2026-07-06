"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddMemberModal from "@/components/members/AddMemberModal";
import EditMemberModal from "@/components/members/EditMemberModal";
import { supabase } from "../lib/supabase";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
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
    if (!confirm("Delete this member?")) return;

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

  const filteredMembers = members.filter(
    (member) =>
      member.member_name.toLowerCase().includes(search.toLowerCase()) ||
      member.member_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md:flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 w-full">
        <Header />

        <main className="p-4 md:p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
              Members
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Member
            </button>

          </div>

          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border rounded-lg p-3 mb-5"
          />

          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="min-w-[900px] w-full">

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

                  <tr key={member.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{member.member_id}</td>

                    <td className="p-3 font-medium">
                      {member.member_name}
                    </td>

                    <td className="p-3">{member.join_date}</td>

                    <td className="p-3">
                      BDT {Number(member.monthly_deposit).toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {member.status}
                      </span>
                    </td>

                    <td className="p-3">

                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setEditOpen(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteMember(member.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

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

        <EditMemberModal
          open={editOpen}
          member={selectedMember}
          onClose={() => {
            setEditOpen(false);
            setSelectedMember(null);
          }}
          onSuccess={loadMembers}
        />

      </div>
    </div>
  );
}