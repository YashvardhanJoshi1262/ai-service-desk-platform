export default function MyTicketsPage() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">
        My Tickets
      </h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Ticket ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">INC001</td>
              <td className="p-3">VPN Not Working</td>
              <td className="p-3">High</td>
              <td className="p-3">Open</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">INC002</td>
              <td className="p-3">Outlook Issue</td>
              <td className="p-3">Medium</td>
              <td className="p-3">In Progress</td>
            </tr>

            <tr>
              <td className="p-3">INC003</td>
              <td className="p-3">Password Reset</td>
              <td className="p-3">Low</td>
              <td className="p-3">Resolved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}