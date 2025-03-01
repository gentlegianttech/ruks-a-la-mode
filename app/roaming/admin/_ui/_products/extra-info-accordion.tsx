// app/admin/products/components/ExtraInfoAccordion.tsx
"use client";

import { formatPrice } from "@/helpers/functions";
import { ProductProps } from "@/helpers/types";

export default function ExtraInfoAccordion({ product }: { product: any }) {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-sm mb-2">Extra Info</h3>
      <p className="text-xs mb-3">Quantity: {product?.quantity}</p>
      {product?.colors.map((color: any, i: number) => (
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full cursor-pointer p-0.5`}
          key={i}
        >
          <span
            key={i}
            className={` inline-block w-full h-full rounded-full`}
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
          ></span>
        </div>
      ))}

      {product.components?.length > 0 && (
        <div>
          <h4 className="text-sm">Components</h4>
          <ul>
            {product.components.map((component: any) => (
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
