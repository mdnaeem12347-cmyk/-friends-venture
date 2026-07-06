export default function Header() {
  return (
    <header className="bg-white shadow px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
          Dashboard
        </h2>
      </div>

      <div className="text-left md:text-right">
        <p className="font-semibold text-gray-800">
          Admin
        </p>

        <p className="text-sm text-gray-500">
          Friends Venture
        </p>
      </div>
    </header>
  );
}