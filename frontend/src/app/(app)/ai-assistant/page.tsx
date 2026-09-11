"use client";

import { useEffect, useState } from "react";
import { getTickets } from "@/lib/localStorage";
import { Ticket } from "@/types/ticket";

export default function AIAssistantPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [recommendation, setRecommendation] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const allTickets = getTickets();

    const openTickets = allTickets.filter(
      (ticket) => ticket.status === "Open"
    );

    setTickets(openTickets);
  }, []);

  const handleGenerateRecommendation = async () => {
  if (!selectedTicket) {
    return;
  }

  setLoading(true);
  setError(null);
  setRecommendation(null);

  try {
    const response = await fetch(
      `http://localhost:3001/tickets/${selectedTicket.id}/recommendation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTicket),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate recommendation");
    }

    const data = await response.json();

    setRecommendation(data.recommendation);
  } catch (error) {
    console.error(error);

    setError(
      "Unable to generate the recommendation. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  const handleClose = () => {
    setSelectedTicket(null);
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Assistant
        </h1>

        <p className="mt-2 text-gray-600">
          Select an incident to get an AI-powered resolution recommendation.
        </p>
      </div>

      {/* Incident List */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            New Incidents
          </h2>

          <p className="text-sm text-gray-500">
            Open incidents that are ready for AI analysis
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No new incidents available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                  <th className="px-6 py-4">Incident ID</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {ticket.id}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ticket.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
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

                    <td className="px-6 py-4 text-gray-700">
                      {ticket.category}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Analyze
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Incident */}
      {selectedTicket && (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Incident Analysis
              </h2>

              <p className="text-sm text-gray-500">
                {selectedTicket.id}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          {/* Incident Details */}
          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {selectedTicket.title}
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Priority</p>

                <p className="font-medium text-gray-900">
                  {selectedTicket.priority}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Category</p>

                <p className="font-medium text-gray-900">
                  {selectedTicket.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>

                <p className="font-medium text-gray-900">
                  {selectedTicket.status}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Description
              </p>

              <p className="mt-1 text-gray-800">
                {selectedTicket.description}
              </p>
            </div>
          </div>

          {/* Generate Recommendation */}
          <div className="mt-6">
            <button
              onClick={handleGenerateRecommendation}
              disabled={loading}
              className="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Generating Recommendation..."
                : "Generate AI Resolution Recommendation"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Recommendation */}
          {recommendation && (
            <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-900">
                AI Resolution Recommendation
              </h3>

              <p className="whitespace-pre-line leading-7 text-gray-800">
                {recommendation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}