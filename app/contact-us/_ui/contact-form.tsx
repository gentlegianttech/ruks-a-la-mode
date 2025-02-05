"use client";

import Button from "@/app/ui/button";

export default function ContactForm() {
  return (
    <div className="lg:w-1/2 w-full">
      <p className="lg:text-5xl text-3xl">Contact</p>
      <p className="mt-3 opacity-60">
        Send a message and our team will get back to within 24 hrs
      </p>
      <div className="flex flex-col items-start space-y-5 my-10">
        <input
          placeholder="Name"
          className="px-6 bg-lightgrey h-16 rounded-full w-full"
          type="text"
        />
        <input
          placeholder="Email"
          className="px-6 bg-lightgrey h-16 rounded-full w-full"
          type="email"
        />
        <textarea
          placeholder="Message"
          className="px-6 pt-6 bg-lightgrey w-full h-44 rounded-[40px]"
        />
      </div>
      <Button label="Send Message" onClick={() => {}} />
    </div>
  );
}
