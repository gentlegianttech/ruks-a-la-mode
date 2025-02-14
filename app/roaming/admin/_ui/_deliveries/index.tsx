import { getDeliveries, updateOrder } from "@/helpers/api-controller";
import { Delivery } from "@/helpers/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Deliveries = () => {
  // const [deliveries, setDeliveries] = useState<Delivery[]>([
  //   {
  //     id: "D001",
  //     customerName: "JohnDoe@gmail.com",
  //     address: "123 Main Street, Springfield",
  //     status: "Pending",
  //     expectedDate: "2025-01-25",
  //     assignedTo: null,
  //   },
  //   {
  //     id: "D002",
  //     customerName: "JaneSmith@gmail.com",
  //     address: "456 Elm Street, Shelbyville",
  //     status: "In Transit",
  //     expectedDate: "2025-01-26",
  //     assignedTo: "Delivery Personnel 1",
  //   },
  // ]);

  const {
    data: deliveriesData,
    isLoading,
    isError,
    refetch: refetchDeliveries,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getDeliveries(),
  });

  const deliveries = deliveriesData?.deliveries;

  const updateOrderStatusMutation = useMutation({
    mutationFn: (data: any) => updateOrder(data),
    onSuccess: () => refetchDeliveries(),
  });

  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filtered and searched deliveries
  const filteredDeliveries = deliveries?.filter((delivery: any) => {
    const matchesFilter = filter === "All" || delivery?.data?.status === filter;
    let fullname =
      delivery?.data?.shippingInfo?.firstname +
      " " +
      delivery?.data?.shippingInfo?.surname;
    const matchesSearch =
      fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDeliveries?.length / itemsPerPage);
  const displayedDeliveries: any = filteredDeliveries?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update delivery status
  const updateStatus = (id: string, status: Delivery["status"]) => {
    updateOrderStatusMutation.mutate({ id, status });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Management</h2>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {["All", "Pending", "In Transit", "Delivered", "Canceled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded text-xs ${
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
          className="border px-4 py-2 rounded w-1/3 text-xs"
        />
      </div>

      {/* Deliveries Table */}
      <table className="min-w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border text-xs">Delivery ID</th>
            <th className="px-4 py-2 border text-xs">Customer Name</th>
            <th className="px-4 py-2 border text-xs">Address</th>
            <th className="px-4 py-2 border text-xs">Status</th>
            <th className="px-4 py-2 border text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedDeliveries?.map((delivery: any) => (
            <tr key={delivery.id}>
              <td className="px-4 py-2 border text-xs">{delivery.id}</td>
              <td className="px-4 py-2 border text-xs">
                {delivery?.data?.shippingInfo?.firstname +
                  " " +
                  delivery?.data?.shippingInfo?.surname}
              </td>
              <td className="px-4 py-2 border text-xs">
                {delivery?.data?.shippingInfo?.address}
              </td>
              <td className="px-4 py-2 border text-xs">
                <span className={`px-2 py-1 rounded text-yellow-500`}>
                  {delivery?.data?.status}
                </span>
              </td>
              <td className="px-4 py-2 border text-xs">
                <button
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      delivery?.data?.status === "ready"
                        ? "transit"
                        : "completed"
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
          className="px-4 py-2 rounded bg-gray-200 text-xs disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-xs">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 text-xs disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Deliveries;
