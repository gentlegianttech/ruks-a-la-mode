import React from "react";

type Order = {
  id: string;
  email: string;
  createdAt: string;
  status: string;
  items: { productName: string; quantity: number; price: number }[];
};

type OrderDetailsProps = {
  order: any;
  onClose: () => void;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md lg:w-3/4 w-full">
        <h2 className="lg:text-xl font-bold mb-4">
          Order Details - {order.id}
        </h2>
        <p className="mb-2 text-xs">
          Customer: {order?.data?.shippingInfo?.email}
        </p>
        <p className="mb-2 text-xs">createdAt: {order?.data?.createdAt}</p>
        <p className="mb-2 text-xs">Status: {order?.data?.status}</p>
        <p className="mb-4 text-sm">
          Total: $
          {order?.data?.items?.reduce(
            (sum: any, item: any) => sum + item?.item?.price,
            0
          )}
        </p>

        <h3 className="lg:text-lg font-bold mb-2">Items:</h3>
        <table className="min-w-full table-auto bg-white shadow rounded mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border text-xs">Product</th>
              <th className="px-4 py-2 border text-xs">Quantity</th>
              <th className="px-4 py-2 border text-xs">Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.data?.items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-xs">{item?.item?.name}</td>
                <td className="px-4 py-2 border text-xs">{item?.quantity}</td>
                <td className="px-4 py-2 border text-xs">
                  ${item?.item?.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 text-xs rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
