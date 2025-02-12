"use client";

import { useEffect, useState } from "react";
import Orders from "./_ui/_orders";
import MainArea from "./_ui/main-area";
import Sidebar from "./_ui/sidebar";
import Products from "./_ui/_products";
import Payments from "./_ui/_payments";
import Deliveries from "./_ui/_deliveries";
import Administrators from "./_ui/_administrators";
import Content from "./_ui/_content";
import Analytics from "./_ui/_analytics";
import {
  FaTshirt,
  FaShoppingCart,
  FaUsers,
  FaTruck,
  FaMoneyBill,
  FaCogs,
  FaImages,
} from "react-icons/fa";
import { useAppContext } from "@/helpers/store";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { auth, logout } from "@/helpers/utils/auth";

export default function Page() {
  const [activeView, setActiveView] = useState("orders");

  const [open, setopen] = useState(false);

  const router = useRouter();
  const context = useAppContext();

  const { user, setuser } = context;

  const menuItems = [
    { key: "orders", label: "Orders", icon: <FaShoppingCart /> },
    { key: "products", label: "Products", icon: <FaTshirt /> },
    // { key: "payments", label: "Payments", icon: <FaMoneyBill /> },
    // { key: "deliveries", label: "Deliveries", icon: <FaTruck /> },
    // { key: "administrators", label: "Administrators", icon: <FaCogs /> },
    { key: "content", label: "Content", icon: <FaImages /> },
    // { key: "analytics", label: "Analytics", icon: <FaSquarePollVertical /> },
  ];

  const renderView = () => {
    switch (activeView) {
      case "orders":
        return <Orders />;
      case "products":
        return <Products />;
      // case "payments":
      //   return <Payments />;
      case "deliveries":
        return <Deliveries />;
      // case "administrators":
      //   return <Administrators />;
      case "content":
        return <Content />;
      // case "analytics":
      //   return <Analytics />;
      default:
        return <div>Select a view</div>;
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/roaming/login");
    }
  }, [user]);

  return (
    <div className="flex lg:flex-row flex-col">
      <div className="lg:hidden mb-8 flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#0e0e0e"
          className="size-6 lg:hidden block"
          onClick={() => setopen(!open)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {open && (
          <div className="flex flex-col items-center space-y-2 mt-2">
            {menuItems?.map((m) => (
              <div
                key={m?.label}
                onClick={() => {
                  setActiveView(m.key);
                  setopen(false);
                }}
              >
                <p className="uppercase font-bold text-gray-900">{m.label}</p>
              </div>
            ))}
            <div
              onClick={() => {
                logout();
                setuser(undefined);
                setopen(false);
              }}
            >
              <p className="uppercase font-bold text-gray-900">LOGOUT</p>
            </div>
          </div>
        )}
      </div>
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        menuItems={menuItems}
      />
      <MainArea>{renderView()}</MainArea>
    </div>
  );
}
