"use client";

import { useAppContext } from "@/helpers/store";
import Image from "next/image";
import Incrementer from "@/app/ui/incrementer";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/helpers/functions";

export default function Page() {
  const context = useAppContext();
  const router = useRouter();

  const { cart, setcart, currency, exchangeRates } = context;
  console.log(cart);
  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      {cart?.length > 0 ? (
        <div>
          <p className="mt-12 text-4xl font-medium tracking-widest">
            Shopping Bag
          </p>
          <div className="container mx-auto mt-20">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border border-dark">
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="">
                  {cart?.map((c, i) => (
                    <tr className="border-b" key={c?.item?.id}>
                      <td className="px-4 py-2 flex lg:flex-row flex-col items-start lg:items-center">
                        <Image
                          width={170}
                          height={150}
                          src={c?.item?.image}
                          alt="Product Image"
                          className="w-28 h-28 mr-4"
                        />
                        <span className="lg:text-sm text-xs">
                          {c?.item?.name}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <div className="mt-4 lg:w-64 w-16 p-1 lg:p-3 border-dark border ">
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
                      <td className="px-4 py-2">
                        {formatPrice(
                          currency,
                          c.item?.price * exchangeRates[currency] * c.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col items-end mt-10">
            <div className=" bg-black/85 p-5 rounded-sm">
              <span className="flex items-center justify-start space-x-3">
                <p className="font-medium text-lg text-[#f5f5f5]">
                  Estimated Total
                </p>
                <p className="font-light text-[#f5f5f5]">
                  {formatPrice(
                    currency,
                    cart?.reduce(
                      (sum, item) => item.item?.price * item.quantity + sum,
                      0
                    ) * exchangeRates[currency]
                  )}
                </p>
              </span>
              <p className="text-xs mt-2 text-[#f5f5f5]">
                *Taxes, discounts and shipping calculated at checkout
              </p>
            </div>
            <div
              onClick={() => router.push("cart/checkout")}
              className={`mt-10 w-80 p-3 bg-black/85 flex items-center justify-center hover:opacity-70 ${"cursor-pointer"}`}
            >
              <p className="text-[#f5f5f5]">Check out</p>
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
