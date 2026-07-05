"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabase";
import MemberForm from "./MemberForm";

export default function AddMemberModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    member_id: "",
    member_name: "",
    join_date: "",
    monthly_deposit: "",
  });

  if (!open) return null;

  async function saveMember() {
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

    const { error } = await supabase.from("members").insert([
      {
        member_id: form.member_id,
        member_name: form.member_name,
        join_date: form.join_date,
        monthly_deposit: Number(form.monthly_deposit),
        status: "Active",
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Member added successfully");

    setForm({
      member_id: "",
      member_name: "",
      join_date: "",
      monthly_deposit: "",
    });

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Add Member
        </h2>

        <MemberForm
          form={form}
          setForm={setForm}
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => {
              setForm({
                member_id: "",
                member_name: "",
                join_date: "",
                monthly_deposit: "",
              });
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={saveMember}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save Member"}
          </button>

        </div>

      </div>

    </div>
  );
}