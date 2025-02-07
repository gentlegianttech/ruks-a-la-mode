"use client";

import Button from "@/app/ui/button";

export default function ContactForm() {
  return (
    <div className="lg:w-1/2 w-full">
      <p className="lg:text-5xl text-2xl">Contact</p>
      <p className="mt-3 opacity-90 lg:text-base text-sm text-dark">
        Send a message and our team will get back to within 24 hrs
      </p>
      <div className="flex flex-col items-start space-y-5 lg:my-10 my-6">
        <input
          placeholder="Name"
          className="lg:px-6 px-3 bg-transparent border border-dark lg:h-16 h-10 w-full"
          type="text"
        />
        <input
          placeholder="Email"
          className="lg:px-6 px-3 bg-transparent border border-dark lg:h-16 h-10 w-full"
          type="email"
        />
        <textarea
          placeholder="Message"
          className="lg:px-6 pt-6 px-3 bg-transparent border border-dark w-full lg:h-44 h-28"
        />
      </div>
      <Button label="Send Message" onClick={() => {}} />
    </div>
  );
}
