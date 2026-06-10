"use client";

import { useState } from "react";
import {
  saveTicket,
  generateTicketId,
} from "@/lib/localStorage";
import { Ticket } from "@/types/ticket";

export default function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Software");

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill all required fields");
      return;
    }

    const newTicket: Ticket = {
      id: generateTicketId(),
      title,
      description,
      priority,
      category,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    saveTicket(newTicket);

    alert("Ticket Created Successfully");

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Software");
  };

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">
        Create New Ticket
      </h1>

      <div className="max-w-2xl rounded-xl bg-white p-6 shadow">
        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            className="w-full rounded border p-3"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
            className="w-full rounded border p-3"
            rows={5}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option>Network</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Security</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="rounded bg-slate-900 px-6 py-3 text-white"
        >
          Create Ticket
        </button>
      </div>
    </div>
  );
}