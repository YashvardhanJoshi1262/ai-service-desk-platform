import { Ticket } from "@/types/ticket";

const STORAGE_KEY = "tickets";

export function getTickets(): Ticket[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveTicket(ticket: Ticket) {
  const tickets = getTickets();

  tickets.push(ticket);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tickets)
  );
}

export function getTicketCounts() {
  const tickets = getTickets();

  return {
    open: tickets.filter(
      (ticket) => ticket.status === "Open"
    ).length,

    inProgress: tickets.filter(
      (ticket) => ticket.status === "In Progress"
    ).length,

    resolved: tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length,
  };
}

export function updateTicketStatus(
  ticketId: string,
  newStatus: string
) {
  const tickets = getTickets();

  const updatedTickets = tickets.map((ticket) =>
    ticket.id === ticketId
      ? {
          ...ticket,
          status: newStatus,
        }
      : ticket
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTickets)
  );
}

export function generateTicketId() {
  const tickets = getTickets();

  const nextNumber = tickets.length + 1;

  return `INC${String(nextNumber).padStart(6, "0")}`;
}