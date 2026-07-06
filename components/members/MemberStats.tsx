interface Member {
  id: number;
  status: string;
  monthly_deposit: number;
}

interface Props {
  members: Member[];
}

export default function MemberStats({ members }: Props) {
  const totalMembers = members.length;

  const activeMembers = members.filter(
    (m) => m.status === "Active"
  ).length;

  const inactiveMembers = totalMembers - activeMembers;

  const monthlyCollection = members.reduce(
    (sum, m) => sum + Number(m.monthly_deposit || 0),
    0
  );

  const cards = [
    {
      title: "Total Members",
      value: totalMembers,
      color: "text-blue-700",
    },
    {
      title: "Active Members",
      value: activeMembers,
      color: "text-green-600",
    },
    {
      title: "Inactive Members",
      value: inactiveMembers,
      color: "text-red-600",
    },
    {
      title: "Monthly Collection",
      value: `BDT ${monthlyCollection.toLocaleString()}`,
      color: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <p className="text-sm text-gray-500">{card.title}</p>

          <h2 className={`mt-2 text-3xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}