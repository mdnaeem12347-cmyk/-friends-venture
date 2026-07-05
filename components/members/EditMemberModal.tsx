"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabase";
import MemberForm from "./MemberForm";

type Member = {
  id: number;
  member_id: string;
  member_name: string;
  join_date: string;
  monthly_deposit: number;
  status: string;
};

type Props = {
  open: boolean;
  member: Member | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMemberModal({
  open,
  member,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    member_id: "",
    member_name: "",
    join_date: "",
    monthly_deposit: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        member_id: member.member_id,
        member_name: member.member_name,
        join_date: member.join_date,
        monthly_deposit: String(member.monthly_deposit),
      });
    }
  }, [member]);

  if (!open || !member) return null;

  async function updateMember() {
    if (!member) return;

    if (
      !form.member_id ||
      !form.member_name ||
      !form.join_date ||
      !form.monthly_deposit
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("members")
      .update({
        member_id: form.member_id,
        member_name: form.member_name,
        join_date: form.join_date,
        monthly_deposit: Number(form.monthly_deposit),
      })
      .eq("id", member.id);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Member updated successfully");

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Edit Member
        </h2>

        <MemberForm form={form} setForm={setForm} />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={updateMember}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? "Updating..." : "Update Member"}
          </button>
        </div>
      </div>
    </div>
  );
}