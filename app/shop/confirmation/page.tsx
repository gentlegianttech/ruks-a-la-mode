"use client";

import { createOrder, verifyTransaction } from "@/helpers/api-controller";
import emailjs from "@emailjs/browser";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

interface ShippingInfo {
  address: string;
  country: string;
  city: string;
  state: string;
  phonenumber: string;
  email: string;
  firstname: string;
  surname: string;
  zipCode: string;
}

function Confirmation() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const email = searchParams.get("email");
  const quantity = searchParams.get("quantity");
  const price = searchParams.get("price");

  const [isMessageSending, setIsMessageSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const today = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

  const [items, setItems] = useState<any[]>();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();

  const orderItemsHTML = items
    ?.map(
      (item) => `
    <tr>
      <td>${item.item?.name}</td>
      <td>${item.quantity}</td>
      <td>${item.item.price}</td>
    </tr>
  `
    )
    .join("");

  const templateParams = {
    user_name: shippingInfo?.firstname + "" + shippingInfo?.surname,
    order_id: "12345",
    order_date: today,
    order_total: price,
    shipping_name: shippingInfo?.firstname + "" + shippingInfo?.surname,
    shipping_address:
      shippingInfo?.address + "" + shippingInfo?.city + shippingInfo?.country,
    order_items: orderItemsHTML,
  };

  const sendEmail = async () => {
    setIsMessageSending(true);
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: "app",
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
    await emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ?? "",
        templateParams,
        {
          publicKey: process.env.EMAIL_JS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setIsMessageSending(false);
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const createOrderMutation = useMutation({
    mutationFn: (order: any) => createOrder(order),
    onSuccess: async () => await sendEmail(),
  });

  const verifyPayment = async () => {
    console.log(items);
    if (!reference || !email || !quantity || !price) {
      return alert("Incomplete verification parameters");
    }

    const verificationResponse = await verifyTransaction(reference);
    console.log(verificationResponse);

    if (verificationResponse?.message === "Verification successful") {
      if (
        shippingInfo?.address &&
        shippingInfo?.city &&
        shippingInfo?.phonenumber
      ) {
        createOrderMutation.mutate({
          items,
          shippingInfo,
          createdAt: today,
          txref: reference,
          price,
        });
      }
    }
  };

  // Retrieve items from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        console.log(JSON.parse(storedItems));
        setItems(JSON.parse(storedItems));
      }
      const storedInfo = localStorage.getItem("shippingInfo");
      if (storedInfo) {
        console.log(JSON.parse(storedInfo));
        setShippingInfo(JSON.parse(storedInfo));
      }
    }
  }, []);

  // Verify payment and update orders
  useEffect(() => {
    if (items) {
      verifyPayment();
    }
  }, [reference, email, quantity, price, items, shippingInfo]);

  if (createOrderMutation.isPending || isMessageSending || isVerifying) {
    return (
      <div className="flex flex-col items-center space-y-5">
        <p className={`text-center`}>
          PLEASE STAY ON THIS PAGE AS WE CONFIRM YOUR TICKET & ADD YOU TO THE
          GUESTLIST
        </p>{" "}
        <Blocks />{" "}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <p className={` text-center lg:text-6xl text-4xl mt-28`}>
        WE'LL BE IN TOUCH!
      </p>
      <p className={` text-center text-2xl font-bold mt-8 lg:w-2/3`}>
        Product Details & Shipping Info Have Been Forwarded to {email}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Confirmation />
    </Suspense>
  );
}
