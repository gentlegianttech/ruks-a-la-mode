"use client";

import { useState } from "react";
import CountryDropdown from "./country-dropdown";

const CheckoutForm = ({
  checkoutCart,
}: {
  checkoutCart: (value: any) => void;
}) => {
  const [shippingInfo, setShippingInfo] = useState({
    firstname: "",
    surname: "",
    email: "",
    address: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
    phonenumber: "",
  });

  return (
    <form className="mt-8 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              First Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={shippingInfo.firstname}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, firstname: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="surname"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              Surname
            </label>
            <input
              id="surname"
              name="surname"
              type="surname"
              required
              value={shippingInfo.surname}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, surname: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="phonenumber"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              Phone Number
            </label>
            <input
              id="phonenumber"
              name="phonenumber"
              type="text"
              required
              value={shippingInfo.phonenumber}
              onChange={(e) =>
                setShippingInfo({
                  ...shippingInfo,
                  phonenumber: e.target.value,
                })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={shippingInfo.email}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, email: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        <CountryDropdown
          country={shippingInfo?.country}
          setCountry={(c) => setShippingInfo({ ...shippingInfo, country: c })}
        />

        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="address"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="zipCode"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              Zipcode
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              required
              value={shippingInfo.zipCode}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="state"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              value={shippingInfo.state}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, state: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="city"
              className="block text-xs lg:text-sm font-medium text-coffee"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={shippingInfo.city}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, city: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none bg-transparent text-sm"
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (
            shippingInfo.email === "" ||
            shippingInfo.address === "" ||
            shippingInfo.city === "" ||
            shippingInfo.firstname === "" ||
            shippingInfo.surname === "" ||
            shippingInfo.state === "" ||
            shippingInfo.phonenumber === ""
          ) {
            return alert("We need some information to process your delivery.");
          }
          checkoutCart(shippingInfo);
        }}
        className={`mt-2 lg:w-1/2 w-full p-3 bg-black/85 flex items-center font-medium justify-center hover:opacity-70 ${"cursor-pointer"}`}
      >
        <p className="text-[#f5f5f5] lg:text-sm text-xs uppercase">Check out</p>
      </div>
    </form>
  );
};

export default CheckoutForm;
