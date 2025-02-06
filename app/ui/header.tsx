"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ShoppingBag from "../shop/_ui/shopping-bag";
import { useAppContext } from "@/helpers/store";

export default function Header() {
  const routes = ["home", "shop", "contact-us"];
  const paths = ["/", "/shop", "/contact-us"];
  const pathname = usePathname();

  const [open, setopen] = useState(false);

  const context = useAppContext();

  const { currencies, currency, setCurrency } = context;
  return (
    <>
      {paths.some(
        (path) => pathname.startsWith(path) && !pathname.startsWith("/roaming")
      ) && (
        <div className="relative ">
          <div className="w-full flex items-center justify-between pb-8 pt-16 lg:px-28">
            <div className="w-2/5 items-center justify-start flex lg:ml-0 ml-2">
              <Link href="/" className="">
                <p className="uppercase lg:font-bold font-black text-coffee text-lg lg:text-2xl tracking-wider">
                  RUKS Á LA MODE
                </p>
              </Link>
            </div>
            <div className="lg:flex items-center justify-center space-x-16 hidden w-1/3">
              {routes.map((r) => (
                <Link key={r} href={r === "home" ? "/" : `/${r}`}>
                  <div className="cursor-pointer hover:bg-[#fea203] hover:bg-opacity-30">
                    <p className="uppercase font-bold text-coffee text-lg tracking-wider cursor-pointer">
                      {r.replace("-", " ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-1/3 flex items-center justify-center lg:justify-end">
              <ShoppingBag />
              <select
                className="bg-transparent ml-4 border-2 border-dark p-1 outline-none"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies?.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {paths.some(
              (path) =>
                pathname.startsWith(path) && !pathname.startsWith("/roaming")
            ) && (
              <div className="lg:hidden flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="#0e0e0e"
                  className="size-8"
                  onClick={() => setopen(!open)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </div>
          {open && (
            <div className="absolute flex flex-col items-start space-y-2 px-4 pb-4 bg-[#f5f5f5] w-full z-50">
              {routes.map((r) => (
                <Link
                  href={r === "home" ? "/" : `/${r}`}
                  onClick={() => setopen(false)}
                  key={r}
                >
                  <p className="uppercase font-bold text-gray-900">
                    {r.replace("-", " ")}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
