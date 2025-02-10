"use client";

import { useAppContext } from "@/helpers/store";
import Image from "next/image";
import Incrementer from "@/app/ui/incrementer";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/helpers/functions";
import Link from "next/link";

export default function Page() {
  const context = useAppContext();
  const router = useRouter();

  const { cart, setcart, currency, exchangeRates } = context;
  console.log(cart);
  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      {cart?.length > 0 ? (
        <div className="w-full">
          <div className="w-full flex lg:flex-row flex-col items-end lg:justify-between lg:pr-36">
            <p className="mt-12 lg:text-4xl text-2xl font-medium tracking-widest">
              Shopping Bag
            </p>
            <Link href="/shop" className="text-xs lg:mt-0 mt-2 underline">
              Continue Shopping
            </Link>
          </div>
          <div className="container lg:mx-20 lg:mt-16 mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b-[0.5px] border-dark/40">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-extralight w-1/2 lg:w-2/3">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-extralight">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-extralight">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {cart?.map((c, i) => (
                    <tr className="border-b" key={c?.item?.id}>
                      <td className="px-4 my-5 lg:my-12 flex lg:flex-row flex-col items-start lg:items-center">
                        <Image
                          width={120}
                          height={280}
                          src={c?.item?.image}
                          alt="Product Image"
                          className=" mr-4"
                        />
                        <span className="lg:text-sm font-light text-xs lg:mt-0 mt-3">
                          {c?.item?.name}
                        </span>
                      </td>
                      <td className="px-4">
                        <div className="flex items-center">
                          <div className="mt-4 lg:w-40 w-16 p-1 lg:p-2 border-dark/70 border ">
                            <Incrementer
                              leftClick={() => {
                                const modifiedCart = [...cart];
                                if (c.quantity > 0) {
                                  if (c.quantity === 1) {
                                    setcart(
                                      cart?.filter(
                                        (ci) => c.item.id !== ci.item.id
                                      )
                                    );
                                    return;
                                  }
                                  modifiedCart[i].quantity -= 1;
                                }
                                setcart(modifiedCart);
                              }}
                              rightClick={() => {
                                const modifiedCart = [...cart];
                                console.log();
                                if (
                                  c?.item?.stock &&
                                  c?.item?.stock > c?.quantity
                                )
                                  modifiedCart[i].quantity += 1;
                                setcart(modifiedCart);
                              }}
                              value={c?.quantity}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-light text-xs lg:text-sm">
                        {formatPrice(
                          currency,
                          c.item?.price *
                            exchangeRates[currency.toLowerCase()] *
                            c.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col items-end mt-10 lg:mx-28">
            <div className=" p-5 rounded-sm">
              <span className="flex items-center justify-end lg:space-x-3 space-x-1">
                <p className="font-medium lg:text-xs text-[10px] text-dark">
                  Estimated Total
                </p>
                <p className="font-light text-dark lg:text-xs text-[10px]">
                  {formatPrice(
                    currency,
                    cart?.reduce(
                      (sum, item) => item.item?.price * item.quantity + sum,
                      0
                    ) * exchangeRates[currency.toLowerCase()]
                  )}
                </p>
              </span>
              <p className="lg:text-xs text-[10px] mt-2 text-dark text-right">
                *Taxes, discounts and shipping calculated at checkout
              </p>
            </div>
            <div
              onClick={() => router.push("cart/checkout")}
              className={`mt-2 lg:w-96 w-40 p-3 bg-black/85 flex items-center font-medium justify-center hover:opacity-70 ${"cursor-pointer"}`}
            >
              <p className="text-[#f5f5f5] lg:text-sm text-xs">Check out</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="lg:text-4xl text-lg font-semibold text-center tracking-widest">
            No Items In Your Shopping Bag
          </p>
          <div
            onClick={() => router.push("/shop")}
            className={`mt-10 w-64 p-3 border-dark border flex items-center justify-center hover:bg-dark/10 ${"cursor-pointer"}`}
          >
            <p>View All Products</p>
          </div>
        </div>
      )}
    </div>
  );
}
