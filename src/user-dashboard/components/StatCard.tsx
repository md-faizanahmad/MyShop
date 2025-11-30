export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">{icon}</div>

      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
