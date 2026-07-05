"use client";

import { Dispatch, SetStateAction } from "react";

type MemberFormData = {
  member_id: string;
  member_name: string;
  join_date: string;
  monthly_deposit: string;
};

type Props = {
  form: MemberFormData;
  setForm: Dispatch<SetStateAction<MemberFormData>>;
};

export default function MemberForm({
  form,
  setForm,
}: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Member ID"
        value={form.member_id}
        onChange={(e) =>
          setForm({
            ...form,
            member_id: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Member Name"
        value={form.member_name}
        onChange={(e) =>
          setForm({
            ...form,
            member_name: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        value={form.join_date}
        onChange={(e) =>
          setForm({
            ...form,
            join_date: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Monthly Deposit"
        value={form.monthly_deposit}
        onChange={(e) =>
          setForm({
            ...form,
            monthly_deposit: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}