"use client";

import { useEffect, useState } from "react";
import { getTicketCounts } from "@/lib/localStorage";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    setCounts(getTicketCounts());
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor incidents and service requests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Open Tickets
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {counts.open}
          </h2>

          <p className="mt-2 text-sm text-red-500">
            +2 today
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {counts.inProgress}
          </h2>

          <p className="mt-2 text-sm text-yellow-500">
            Active work
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {counts.resolved}
          </h2>

          <p className="mt-2 text-sm text-green-500">
            Completed
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Incidents
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span>INC001 - VPN Not Working</span>
            <span className="text-red-500">
              High
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span>INC002 - Outlook Issue</span>
            <span className="text-yellow-500">
              Medium
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>INC003 - Password Reset</span>
            <span className="text-green-500">
              Low
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}