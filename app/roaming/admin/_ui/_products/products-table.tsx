// app/admin/products/components/ProductTable.tsx
"use client";

import React, { useState } from "react";
import { ProductProps } from "@/helpers/types";
import ExtraInfoAccordion from "./extra-info-accordion";
import EditProductModal from "./product-modal";
import DeleteProductModal from "./delete-product-modal";
import { formatPrice } from "@/helpers/functions";

interface ProductTableProps {
  products: ProductProps[];
  onEdit: (product: ProductProps) => void;
  onDelete: () => void;
}
export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left">Category</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <React.Fragment key={product.id}>
            <tr className="border-b">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{formatPrice("NGN", product.price)}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">
                <button
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === product.id ? null : product.id
                    )
                  }
                  className="text-blue-500 hover:underline"
                >
                  {expandedRow === product.id ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="text-yellow-500 hover:underline mx-2"
                >
                  Edit
                </button>
                <DeleteProductModal
                  productId={product.id}
                  onDelete={onDelete}
                />
              </td>
            </tr>
            {expandedRow === product.id && (
              <tr>
                <td colSpan={5}>
                  <ExtraInfoAccordion product={product} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
