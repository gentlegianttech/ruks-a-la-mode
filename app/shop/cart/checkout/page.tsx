"use client";

import Header from "@/app/ui/header";
import { useAppContext } from "@/helpers/store";
import CheckoutForm from "./_ui/checkout-form";
import CheckoutBox from "./_ui/checkout-box";
import { makePayment } from "@/helpers/api-controller";
import { useRouter } from "next/navigation";

export default function Page() {
  const context = useAppContext();
  const { cart, currency, exchangeRates } = context;
  const router = useRouter();

  const handleCheckout = async (shippingInfo: any) => {
    console.log("buying");
    localStorage.setItem("items", JSON.stringify(cart));
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    // router.push(
    //   `/shop/confirmation/?email=${shippingInfo?.email}&quantity=${cart?.reduce(
    //     (sum, item) => item.quantity + sum,
    //     0
    //   )}&price=${cart?.reduce(
    //     (sum, item) => item.item?.price * item.quantity + sum,
    //     0
    //   )}`
    // );
    const response = await makePayment({
      email: shippingInfo?.email,
      price: cart?.reduce(
        (sum, item) => item.item?.price * item.quantity + sum,
        0
      ),
      callbackUrl: `https://ruks-a-la-mode.vercel.app/shop/confirmation/?email=${
        shippingInfo?.email
      }&quantity=${cart?.reduce((sum, item) => item.quantity + sum, 0)}&price=${
        cart?.reduce((sum, item) => item.item?.price * item.quantity + sum, 0) *
        exchangeRates[currency.toLowerCase()]
      }&currency=${currency}`,
      currency,
    });
    if (response["status"]) {
      router.push(response["data"]["authorization_url"]);
    }
  };
  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      <div className="my-10 w-full flex lg:flex-row flex-col-reverse lg:items-start items-center lg:justify-center lg:space-y-0 lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <h2 className="lg:text-4xl text-xl font-medium tracking-wide">
            Delivery Information
          </h2>
          <CheckoutForm checkoutCart={handleCheckout} />
        </div>
        <CheckoutBox
          cart={cart}
          currency={currency}
          rate={exchangeRates[currency.toLowerCase()]}
        />
      </div>
    </div>
  );
}
