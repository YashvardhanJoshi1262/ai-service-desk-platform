import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-4">
      <h2 className="mb-8 text-2xl font-bold">
        AI Service Desk
      </h2>

      <nav>
        <ul className="space-y-4">
  <li>
    <Link href="/dashboard">
      Dashboard
    </Link>
  </li>

  <li>
    <Link href="/create-ticket">
      Create Ticket
    </Link>
  </li>

  <li>
    <Link href="/my-tickets">
      My Tickets
    </Link>
  </li>

  <li>
    <Link href="/ai-assistant">
      AI Assistant
    </Link>
  </li>

  <li>
    <Link href="/settings">
      Settings
    </Link>
  </li>
</ul>
      </nav>
    </div>
  );
}