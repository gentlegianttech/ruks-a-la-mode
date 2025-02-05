import { useEffect, useState } from "react";
import OrderDetails from "./order-details";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrders, updateOrder } from "@/helpers/api-controller";

type Order = {
  id: string;
  email: string;
  createdAt: string;
  status: string; // e.g., "Pending", "Completed", "Cancelled"
  items: { productName: string; quantity: number; price: number }[];
};

export default function Orders() {
  // const [orders, setOrders] = useState<Order[]>([
  //   {
  //     id: "ORD001",
  //     email: "JaneDoe@gmail.com",
  //     createdAt: "2025-01-15",
  //     status: "Pending",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD002",
  //     email: "JohnSmith@gmail.com",
  //     createdAt: "2025-01-16",
  //     status: "Delivered",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD003",
  //     email: "AliceJohnson@mailer.com",
  //     createdAt: "2025-01-17",
  //     status: "Canceled",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD004",
  //     email: "DunyDoe@gmail.com",
  //     createdAt: "2025-01-15",
  //     status: "Pending",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD005",
  //     email: "VinnySmith@gmail.com",
  //     createdAt: "2025-01-16",
  //     status: "Delivered",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD006",
  //     email: "ColinOlhnson@mailer.com",
  //     createdAt: "2025-01-17",
  //     status: "Canceled",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD007",
  //     email: "JinnyUkz@gmail.com",
  //     createdAt: "2025-01-15",
  //     status: "Pending",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD008",
  //     email: "LokiDwin@gmail.com",
  //     createdAt: "2025-01-16",
  //     status: "Delivered",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  //   {
  //     id: "ORD009",
  //     email: "PoliceJohnson@mailer.com",
  //     createdAt: "2025-01-17",
  //     status: "Canceled",
  //     items: [
  //       { productName: "Floral Dress", quantity: 1, price: 49.99 },
  //       { productName: "Leather Jacket", quantity: 1, price: 80 },
  //     ],
  //   },
  // ]);

  const {
    data: allOrders,
    isLoading,
    isError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(),
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: (data: any) => updateOrder(data),
    onSuccess: () => refetchOrders(),
  });

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders = allOrders?.orders;

  // const [isLoading, setIsLoading] = useState(false); // Loading state

  const filteredOrders = orders
    ?.filter((order: any) =>
      filter === "All" ? true : order?.data?.status === filter
    )
    ?.filter(
      (order: any) =>
        order?.data?.shippingInfo?.email
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase()) ||
        order?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

  // Paginate filtered orders
  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
  const paginatedOrders = filteredOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateOrderStatusMutation.mutate({ id, status: newStatus });
    // setOrders((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order.id === id ? { ...order, status: newStatus } : order
    //   )
    // );
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Filters Section */}
      <div className="mb-4 flex items-center space-x-4">
        {/* Status Filter */}
        <div>
          <label className="mr-2 font-medium">Filter by Status:</label>
          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <label className="mr-2 font-medium">Search:</label>
          <input
            type="text"
            className="border rounded px-2 py-1 lg:w-64"
            placeholder="Search by customer or order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center my-4">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div>
          {/* Orders Table */}
          <table className="min-w-full table-auto bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">createdAt</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders?.map((order: any) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex flex-col items-start justify-center">
                      <p>{order?.data?.shippingInfo?.name}</p>
                      <p>{order?.data?.shippingInfo?.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{order?.data?.createdAt}</td>
                  <td className="px-4 py-2 border">
                    {order?.data?.items?.reduce(
                      (sum: any, item: any) => sum + item?.item?.price,
                      0
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order?.data?.status === "processing"
                          ? "bg-yellow-500"
                          : order?.data?.status === "delivered"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order?.data?.status}
                    </span>
                  </td>
                  <td>
                    {order?.data?.status === "processing" && (
                      <>
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() =>
                            handleStatusChange(order.id, "delivered")
                          }
                        >
                          Deliver
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handleStatusChange(order.id, "canceled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleViewDetails(order)}
                      className={`bg-blue-500 text-white px-3 py-1 rounded ${
                        order.status === "Pending" ? "ml-2" : ""
                      }`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}

          {/* No Results Message */}
          {filteredOrders.length === 0 && (
            <p className="mt-4 text-gray-500">
              No orders match your filter and search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
