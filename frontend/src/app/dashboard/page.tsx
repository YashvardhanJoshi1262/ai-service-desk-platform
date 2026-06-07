export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        AI Service Desk Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">
            Open Tickets
          </h2>
          <p className="mt-2 text-3xl font-bold">
            12
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">
            In Progress
          </h2>
          <p className="mt-2 text-3xl font-bold">
            5
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">
            Resolved
          </h2>
          <p className="mt-2 text-3xl font-bold">
            34
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">
          Recent Incidents
        </h2>

        <ul className="space-y-2">
          <li>VPN Not Working</li>
          <li>Outlook Issue</li>
          <li>Password Reset</li>
        </ul>
      </div>
    </div>
  );
}