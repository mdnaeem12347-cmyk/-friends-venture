"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddMemberModal from "@/components/members/AddMemberModal";
import EditMemberModal from "@/components/members/EditMemberModal";
import MemberStats from "@/components/members/MemberStats";
import MemberTable from "@/components/members/MemberTable";
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

  const filteredMembers = members.filter(
    (member) =>
      member.member_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      member.member_id
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-4 md:p-6">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <h1 className="text-3xl font-bold text-blue-700">
                Members
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all Friends Venture members
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
            >
              + Add Member
            </button>

          </div>

          {/* Statistics */}
          <MemberStats members={members} />

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Member ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Members Table */}
          <MemberTable
            members={filteredMembers}
            onEdit={(member) => {
              setSelectedMember(member);
              setEditOpen(true);
            }}
            onDelete={deleteMember}
          />

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