"use client";

import { DateTime } from "luxon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  const socials = [
    "https://www.instagram.com/ruksalamode",
    "https://www.x.com/ruksalamode",
    "https://www.tiktok/ruksalamode",
    "http://wa.me/2349012101539",
  ];
  const menu = ["home", "shop", "contact-us"];
  const paths = ["/", "/shop", "/contact-us"];
  const pathname = usePathname();

  const now = DateTime.now();
  return (
    <>
      {paths.some(
        (path) => pathname.startsWith(path) && !pathname.startsWith("/roaming")
      ) && (
        <footer className="w-full border-dark border text-dark rounded-t-[60px] lg:px-16 px-8 lg:py-10 py-7 mt-4">
          <div className="w-full">
            <div className="w-full lg:flex-row flex flex-col items-start py-12 border-b border-b-[#5b5b5b]">
              <div className="lg:w-[30%] w-full lg:mr-16">
                <div className="lg:w-10/12 w-full lg:mb-0 mb-8">
                  <h1 className="lg:text-3xl text-xl font-bold mb-4">
                    RUKS Á LA MODE
                  </h1>
                  <div className="flex space-x-4 pb-6 my-6 border-b border-b-[#5b5b5b]">
                    {socials.map((s) => (
                      <SocialIcon
                        key={s}
                        url={s}
                        className="w-6 h-6"
                        style={{ width: 40, height: 40 }}
                        bgColor="#212121"
                        fgColor="#5b5b5b"
                      />
                    ))}
                  </div>
                  <p className="opacity-90 leading-relaxed lg:text-base text-sm">
                    Attainable, Comfortable & Chic.
                  </p>
                </div>
              </div>
              <div className="lg:w-[36%] w-3/4 flex items-start justify-between mr-10 text-lg lg:mb-0 mb-8">
                <div className="lg:w-1/2 ">
                  {menu.map((m) => (
                    <Link key={m} href={`/${m}`}>
                      <p className="capitalize mb-3 opacity-90 lg:text-base text-sm">
                        {m.replace("-", " ")}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="lg:w-1/2">
                  <Link
                    href={`https://docs.google.com/document/d/1NDZ68Je333K2B1joCYcinJxoIK21xIEKTIsntr5ibKE/edit?usp=drivesdk`}
                  >
                    <p className="capitalize mb-3 opacity-90 lg:text-base text-sm">
                      Policies
                    </p>
                  </Link>
                </div>
              </div>
              <div className="">
                <p className="opacity-90 mb-4 lg:text-lg tracking-wider">
                  CONTACT US
                </p>
                <div className="flex items-center justify-start space-x-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <div className="">
                    <p className="opacity-95 lg:text-base text-sm">Email</p>
                    <p className="opacity-90 lg:text-base text-sm">
                      ruksalamode@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.60v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                  <div className="">
                    <p className="opacity-95 lg:text-base text-sm">Phone</p>
                    <p className="opacity-90 lg:text-base text-sm">
                      +2349012101539
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="opacity-90 lg:text-base text-xs">
                Copyright © Onnit Tech {now.year}
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
