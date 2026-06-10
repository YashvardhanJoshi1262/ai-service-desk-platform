"use client";

import { useEffect, useState } from "react";
import {
  getTickets,
  updateTicketStatus,
} from "@/lib/localStorage";
import { Ticket } from "@/types/ticket";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const storedTickets = getTickets();
    setTickets(storedTickets);
  }, []);

  const handleStatusChange = (
  ticketId: string,
  status: string
) => {
  updateTicketStatus(ticketId, status);

  setTickets(getTickets());
};
const filteredTickets = tickets.filter((ticket) => {
  const matchesSearch =
    ticket.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    ticket.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    ticket.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">
        My Tickets
      </h1>
      <div className="mb-4">
  <input
    type="text"
    placeholder="Search by Ticket ID or Title..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full max-w-md rounded-lg border p-3"
  />
</div>

<div className="mb-4">
  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="rounded-md border p-2"
  >
    <option value="All">All Statuses</option>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</div>

      <div className="rounded-xl bg-white p-6 shadow">
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {ticket.id}
                  </td>

                  <td className="p-3">
                    {ticket.title}
                  </td>

                  <td className="p-3">
  <span
    className={`rounded-full px-3 py-1 text-sm font-medium
      ${
        ticket.priority === "High"
          ? "bg-red-100 text-red-700"
          : ticket.priority === "Medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
      }`}
  >
    {ticket.priority}
  </span>
</td>

                  <td className="p-3">
  <select
    value={ticket.status}
    onChange={(e) =>
      handleStatusChange(
        ticket.id,
        e.target.value
      )
    }
    className={`rounded-md border px-3 py-2 text-sm font-medium
  ${
    ticket.status === "Resolved"
      ? "bg-green-100 text-green-700"
      : ticket.status === "In Progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700"
  }`}
  >
    <option>Open</option>
    <option>In Progress</option>
    <option>Resolved</option>
  </select>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}