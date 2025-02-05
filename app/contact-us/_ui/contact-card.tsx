import React from "react";
import { SocialIcon } from "react-social-icons";

export default function ContactCard() {
  const socials = [
    "https://www.instagram.com/rift",
    "https://www.twitter.com/rift",
    "https://www.linkedin.com/in/rift",
    "https://www.facebook.com/rift",
  ];
  return (
    <div className="lg:w-[45%] w-full bg-lightgrey lg:p-14 p-10 rounded-[40px] lg:mt-0 mt-8">
      <Tab label="Location">
        <p className="lg:w-3/5 lg:text-2xl text-lg font-light">
          Deo Gracie Mall, Utako.
        </p>
      </Tab>
      <Tab label="Working Hours">
        <div>
          <p className="lg:w-1/2 lg:text-2xl text-lg font-light">
            Monday To Friday 9:00 AM to 6:00 PM
          </p>
          <p className="mt-1 opacity-60">Our Support Team is available 24Hrs</p>
        </div>
      </Tab>
      <Tab label="Contact us">
        <div>
          <p className="lg:w-1/2 lg:text-2xl text-lg font-light">
            +234 809 383 0421
          </p>
          <p className="mt-1 opacity-60">talktous@ruksalamode.com</p>
        </div>
      </Tab>

      <div className="flex space-x-4 lg:pb-6 lg:mb-6">
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
