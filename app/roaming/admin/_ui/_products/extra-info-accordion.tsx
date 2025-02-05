// app/admin/products/components/ExtraInfoAccordion.tsx
"use client";

import { ProductProps } from "@/helpers/types";

export default function ExtraInfoAccordion({
  product,
}: {
  product: ProductProps;
}) {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold">Extra Info</h3>
      {product.materialOptions && (
        <div>
          <h4>Material Options</h4>
          <ul>
            {product.materialOptions.map((material, index) => (
              <li key={index}>
                {material.name} - ${material.price} (Stock: {material.stock})
              </li>
            ))}
          </ul>
        </div>
      )}
      {product.components && (
        <div>
          <h4>Components</h4>
          <ul>
            {product.components.map((component) => (
              <li key={component.id}>
                {component.name} - ${component.price} (Stock: {component.stock})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
