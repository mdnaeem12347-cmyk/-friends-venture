export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h2 className="text-2xl font-bold text-blue-800">
        Dashboard
      </h2>

      <div className="text-right">
        <p className="font-semibold">Admin</p>
        <p className="text-sm text-gray-500">
          Friends Venture
        </p>
      </div>
    </header>
  );
}