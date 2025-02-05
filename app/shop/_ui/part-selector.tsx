"use client";

import { ProductComponent } from "@/helpers/types";
import { useState } from "react";

type PartSelectorProps = {
  components: ProductComponent[] | undefined;
  onSelectPart: (selected: ProductComponent) => void;
  selectedPart: string;
};

export default function PartSelector({
  components,
  onSelectPart,
  selectedPart,
}: PartSelectorProps) {
  const handleSelect = (component: ProductComponent) => {
    onSelectPart(component);
  };

  return (
    <div className="mt-6 w-full">
      <p className="mb-2 font-semibold">Select Component</p>
      <div className="flex lg:flex-row flex-col gap-3">
        <label
          key={"Full Set"}
          className={`p-2 border rounded-md cursor-pointer ${
            selectedPart === "" ? "bg-black text-white" : "bg-white"
          }`}
        >
          <input
            type="radio"
            name="component"
            value={"Full Set"}
            checked={selectedPart === ""}
            onChange={() =>
              handleSelect({ id: "", name: "", price: 0, stock: 0 })
            }
            className="hidden"
          />
          Full Set
        </label>
        {components?.map((component) => (
          <label
            key={component?.id}
            className={`p-2 border rounded-md cursor-pointer ${
              selectedPart === component?.name
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="component"
              value={component?.name}
              checked={selectedPart === component?.name}
              onChange={() => handleSelect(component)}
              className="hidden"
            />
            {component?.name}
          </label>
        ))}
      </div>
    </div>
  );
}
