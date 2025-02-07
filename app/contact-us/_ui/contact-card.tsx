import React from "react";
import { SocialIcon } from "react-social-icons";

export default function ContactCard() {
  const socials = [
    "https://www.instagram.com/ruksalamode",
    "https://www.x.com/ruksalamode",
    "https://www.tiktok/ruksalamode",
    "http://wa.me/2349012101539",
  ];
  return (
    <div className="lg:w-[45%] w-full bg-lightgrey lg:p-14 rounded-[40px] lg:mt-0 mt-12">
      <Tab label="Location">
        <p className="lg:w-3/5 lg:text-2xl text-sm font-light">
          Penthouse, Wing C, Deo Gracia Plaza, Utako, Abuja.
        </p>
      </Tab>
      <Tab label="Working Hours">
        <div>
          <p className="lg:w-1/2 lg:text-2xl text-sm font-light">
            Monday To Friday 9:00 AM to 6:00 PM
          </p>
          <p className="mt-1 opacity-60">Our Support Team is available 24Hrs</p>
        </div>
      </Tab>
      <Tab label="Contact us">
        <div>
          <p className="lg:w-1/2 lg:text-2xl text-sm font-light">
            +234 901 210 1539
          </p>
          <p className="mt-1 opacity-60">ruksalamode@gmail.com</p>
        </div>
      </Tab>

      <div className="flex space-x-4 pb-6 mb-6">
        {socials.map((s) => (
          <SocialIcon
            key={s}
            url={s}
            className="w-6 h-6"
            style={{ width: 40, height: 40 }}
            bgColor="white"
            fgColor="#5b5b5b"
          />
        ))}
      </div>
    </div>
  );
}

const Tab = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="w-full mb-6">
    <p className="uppercase text-sm opacity-60">{label}</p>
    <div className="border-b my-2 border-dark/20" />
    {children}
  </div>
);
