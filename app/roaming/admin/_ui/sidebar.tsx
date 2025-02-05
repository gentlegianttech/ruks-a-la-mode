"use client";
import { useState } from "react";
import { FaSquarePollVertical } from "react-icons/fa6";
import Link from "next/link";

const Sidebar = ({
  setActiveView,
  activeView,
  menuItems,
}: {
  setActiveView: (view: string) => void;
  activeView: string;
  menuItems: any[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed lg:block hidden">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        <Link href="/">
          <p>RUKS Á LA MODE</p>
        </Link>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems?.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveView(item.key)}
                className={`w-full text-left flex items-center px-4 py-2 ${
                  activeView === item.key ? "bg-gray-900" : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
