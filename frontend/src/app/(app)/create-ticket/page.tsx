export default function CreateTicketPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">
        Create New Ticket
      </h1>

      <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter ticket title"
            className="w-full rounded border p-3"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            placeholder="Describe the issue"
            className="w-full rounded border p-3"
            rows={5}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select className="w-full rounded border p-3">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select className="w-full rounded border p-3">
            <option>Network</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Security</option>
          </select>
        </div>

        <button className="rounded bg-slate-900 px-6 py-3 text-white">
          Create Ticket
        </button>
      </div>
    </div>
  );
}