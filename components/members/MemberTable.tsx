"use client";

import { Pencil, Trash2, Users } from "lucide-react";

interface Member {
  id: number;
  member_id: string;
  member_name: string;
  join_date: string;
  monthly_deposit: number;
  status: string;
}

interface Props {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

export default function MemberTable({
  members,
  onEdit,
  onDelete,
}: Props) {
  if (members.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <Users className="mx-auto mb-4 text-gray-400" size={60} />

        <h2 className="text-xl font-semibold text-gray-700">
          No Members Found
        </h2>

        <p className="text-gray-500 mt-2">
          Click <strong>Add Member</strong> to create your first member.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4 text-left">Member ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Join Date</th>
              <th className="p-4 text-left">Monthly Deposit</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b hover:bg-slate-50 transition-colors"
              >
                <td className="p-4 font-medium">
                  {member.member_id}
                </td>

                <td className="p-4">
                  {member.member_name}
                </td>

                <td className="p-4">
                  {member.join_date}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  BDT {Number(member.monthly_deposit).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600 transition"
                      title="Edit Member"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(member.id)}
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700 transition"
                      title="Delete Member"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}