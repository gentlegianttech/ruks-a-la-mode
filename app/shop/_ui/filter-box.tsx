"use client";

import { useMemo, useState } from "react";

type Switches = {
  [key: string]: boolean;
};

type ControllerOptions = {
  [key: string]: string[];
};

type FilterBoxProps = {
  categories?: string[];
  onCategorySelect?: (category: string | null) => void;
  onSortOrderSelect?: (order: "low-to-high" | "high-to-low" | null) => void;
};

export default function FilterBox({
  categories = [],
  onCategorySelect = () => {},
  onSortOrderSelect = () => {},
}: FilterBoxProps) {
  const SORT_ORDER_LABELS = {
    "low-to-high": "Price: Lowest to Highest",
    "high-to-low": "Price: Highest to Lowest",
  };

  const SORT_ORDER_VALUES = Object.keys(SORT_ORDER_LABELS) as Array<
    "low-to-high" | "high-to-low"
  >;

  const controllerOptions: ControllerOptions = {
    category: categories,
    "sort-by": SORT_ORDER_VALUES.map((key) => SORT_ORDER_LABELS[key]),
  };

  const filterMenu = Object.keys(controllerOptions);

  const [switches, setSwitches] = useState<Switches>({
    category: false,
    "sort-by": false,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<
    "low-to-high" | "high-to-low" | null
  >(null);

  const toggleSwitch = (key: string) => {
    setSwitches((prev) => {
      // Close other switches, open the clicked one
      const updatedSwitches = Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: k === key ? !prev[k] : false }),
        {}
      );
      return updatedSwitches;
    });
  };

  const isAnySwitchOn = useMemo(
    () => Object.values(switches).some((value) => value),
    [switches]
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const handleSortOrderClick = (label: string) => {
    const order =
      SORT_ORDER_VALUES.find((key) => SORT_ORDER_LABELS[key] === label) || null;
    setSelectedSortOrder(order);
    onSortOrderSelect(order);
  };

  return (
    <div className="relative">
      {/* Filter Menu */}
      <div className="lg:w-auto border-2 border-coffee py-1 px-3 items-center flex justify-center space-x-8 lg:mt-12 mt-5">
        {filterMenu.map((m) => (
          <div
            className="flex space-x-1 items-end cursor-pointer hover:scale-95 hover:opacity-85 transform ease-in-out duration-200"
            key={m}
            onClick={() => toggleSwitch(m)}
          >
            <p className="text-coffee lg:text-base text-xs font-semibold uppercase">
              {m.replace("-", " ")}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#1B1B1B"
              className="lg:size-5 size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Filter Options */}
      <div
        className={`${
          isAnySwitchOn
            ? "bg-[#ededed] border-coffee border-2 rounded shadow-md"
            : ""
        } absolute w-full mt-1 z-50`}
      >
        {filterMenu.map((m) => (
          <div
            key={m}
            className={`${switches[m] ? "block" : "hidden"} py-2 px-4`}
          >
            <ul className="space-y-1">
              {controllerOptions[m].map((option) => (
                <li
                  key={option}
                  className={`cursor-pointer ${
                    (m === "category" && option === selectedCategory) ||
                    (m === "sort-by" &&
                      (selectedSortOrder === "low-to-high" ||
                        selectedSortOrder === "high-to-low") &&
                      SORT_ORDER_LABELS[selectedSortOrder] === option)
                      ? "text-coffee font-bold"
                      : "text-black"
                  } hover:text-coffee`}
                  onClick={() =>
                    m === "category"
                      ? handleCategoryClick(option)
                      : handleSortOrderClick(option)
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
