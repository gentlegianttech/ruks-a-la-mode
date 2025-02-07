"use client";

import { ProductComponent, Material } from "@/helpers/types";
import { useState } from "react";

type MaterialSelectorProps = {
  materials: Material[] | undefined;
  onSelectPart: (selected: Material) => void;
  selectedPart: string;
};

export default function MaterialSelector({
  materials,
  onSelectPart,
  selectedPart,
}: MaterialSelectorProps) {
  const handleSelect = (component: Material) => {
    onSelectPart(component);
  };

  return (
    <div className="mt-6 w-full">
      <p className="mb-2 lg:font-semibold font-medium lg:text-base text-sm">
        Select Material
      </p>
      <div className="flex lg:flex-row flex-col gap-3">
        {materials?.map((material) => (
          <label
            key={material?.name}
            className={`p-2 border rounded-md cursor-pointer ${
              selectedPart === material?.name
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="material"
              value={material?.name}
              checked={selectedPart === material?.name}
              onChange={() => handleSelect(material)}
              className="hidden lg:text-base text-sm"
            />
            {material?.name}
          </label>
        ))}
      </div>
    </div>
  );
}
