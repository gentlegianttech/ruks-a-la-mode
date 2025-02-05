import { Delivery } from "@/helpers/types";
import { useState } from "react";

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "D001",
      customerName: "JohnDoe@gmail.com",
      address: "123 Main Street, Springfield",
      status: "Pending",
      expectedDate: "2025-01-25",
      assignedTo: null,
    },
    {
      id: "D002",
      customerName: "JaneSmith@gmail.com",
      address: "456 Elm Street, Shelbyville",
      status: "In Transit",
      expectedDate: "2025-01-26",
      assignedTo: "Delivery Personnel 1",
    },
  ]);
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filtered and searched deliveries
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesFilter = filter === "All" || delivery.status === filter;
    const matchesSearch =
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const displayedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update delivery status
  const updateStatus = (id: string, status: Delivery["status"]) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id ? { ...delivery, status } : delivery
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delivery Management</h2>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {["All", "Pending", "In Transit", "Delivered", "Canceled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded ${
                  filter === status
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <input
          type="text"
          placeholder="Search by ID or Customer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-1/3"
        />
      </div>

      {/* Deliveries Table */}
      <table className="min-w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Delivery ID</th>
            <th className="px-4 py-2 border">Customer Name</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Expected Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedDeliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="px-4 py-2 border">{delivery.id}</td>
              <td className="px-4 py-2 border">{delivery.customerName}</td>
              <td className="px-4 py-2 border">{delivery.address}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    delivery.status === "Pending"
                      ? "bg-yellow-500"
                      : delivery.status === "In Transit"
                      ? "bg-blue-500"
                      : delivery.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {delivery.status}
                </span>
              </td>
              <td className="px-4 py-2 border">{delivery.expectedDate}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      delivery.status === "Pending"
                        ? "In Transit"
                        : delivery.status === "In Transit"
                        ? "Delivered"
                        : "Pending"
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Deliveries;
