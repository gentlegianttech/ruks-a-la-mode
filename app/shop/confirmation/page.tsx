"use client";

import { createOrder, verifyTransaction } from "@/helpers/api-controller";
import { bungee, inter } from "@/styles/fonts";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  phonenumber: string;
  email: string;
  name: string;
}

function Confirmation() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const email = searchParams.get("email");
  const quantity = searchParams.get("quantity");
  const price = searchParams.get("price");

  const today = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

  const [items, setItems] = useState<any[]>();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();

  const createOrderMutation = useMutation({
    mutationFn: (order: any) => createOrder(order),
  });

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

  useEffect(() => {
    if (shippingInfo !== undefined && items !== undefined) {
      createOrderMutation.mutate({
        items,
        shippingInfo,
        createdAt: today,
        txref: reference,
      });
    }
  }, [shippingInfo, items]);

  // Verify payment and update orders
  // useEffect(() => {
  //   const verifyPayment = async () => {
  //     console.log(items);
  //     if (!reference || !email || !quantity || !price) {
  //       return alert("Incomplete verification parameters");
  //     }

  //     const verificationResponse = await verifyTransaction(reference);
  //     console.log(verificationResponse);

  //     if (verificationResponse?.message === "Verification successful") {
  //       if (
  //         shippingInfo?.address &&
  //         shippingInfo?.city &&
  //         shippingInfo?.phonenumber
  //       ) {
  //         const updateResponse = await updateMerchOrders(
  //           reference,
  //           email,
  //           items,
  //           parseInt(quantity),
  //           parseInt(price),
  //           shippingInfo?.address,
  //           shippingInfo?.city,
  //           shippingInfo?.state,
  //           shippingInfo?.phonenumber
  //         );
  //         console.log(updateResponse);
  //       }
  //     }
  //   };

  //   if (items.length > 0) {
  //     verifyPayment();
  //   }
  // }, [reference, email, quantity, price, items, shippingInfo]);

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
