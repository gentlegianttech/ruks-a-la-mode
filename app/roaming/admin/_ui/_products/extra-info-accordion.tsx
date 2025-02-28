// app/admin/products/components/ExtraInfoAccordion.tsx
"use client";

import { formatPrice } from "@/helpers/functions";
import { ProductProps } from "@/helpers/types";

export default function ExtraInfoAccordion({
  product,
}: {
  product: ProductProps;
}) {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-sm">Extra Info</h3>
      <p className="text-xs">Quantity: {product?.quantity}</p>
      {product.components && (
        <div>
          <h4 className="text-sm">Components</h4>
          <ul>
            {product.components.map((component) => (
              <li key={component.id} className="text-xs">
                {component.name} - ${component.price} (Stock: {component.stock})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
