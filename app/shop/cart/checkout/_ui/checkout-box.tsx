import { formatPrice } from "@/helpers/functions";
import { CartItemProps } from "@/helpers/types";
import Image from "next/image";

export default function CheckoutBox({
  cart,
  currency,
  rate,
}: {
  cart: any[];
  currency: string;
  rate: number;
}) {
  const shippingFee = 6000 * rate;

  return (
    <div className="p-3 border border-dark lg:w-[46%] w-full lg:mb-0 mb-16">
      <div className="w-full lg:p-8 p-2">
        {cart?.map((c) => {
          const formattedMeasurementString = Object.entries(
            c?.item?.measurement
          )
            .map(
              ([key, value]) =>
                `${key.charAt(0).toUpperCase() + key.slice(1)}-${value}`
            )
            .join(", ");
          return (
            <div
              className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between w-full lg:mb-2 mb-3"
              key={c?.item?.id}
            >
              <div className="flex items-center w-full justify-start">
                <Image
                  width={100}
                  height={150}
                  src={c?.item.image}
                  alt="Product Image"
                  className=" mr-4"
                />
                <div>
                  <p className="tracking-wide lg:text-base text-sm font-medium lg:font-bold uppercase">
                    {c?.item?.name}
                  </p>
                  <p className="font-extralight tracking-wide text-[9px]">
                    {formattedMeasurementString}
                  </p>
                </div>
              </div>
              <p className="lg:text-base text-sm lg:mt-0 mt-4">
                {formatPrice(currency, c?.item?.price * c?.quantity * rate)}
              </p>
            </div>
          );
        })}
        <div className="w-full flex items-center justify-between mt-8">
          <input
            className="w-3/4 border border-dark bg-transparent text-xs outline-none p-1 lg:h-11 h-9"
            type="text"
            placeholder="Coupon or Discount Code"
            id="discountCode"
            name="discountCode"
          />
          <div className="p-2 lg:h-11 h-9 bg-dark border border-dark w-28 flex items-center justify-center cursor-pointer hover:opacity-80">
            <p className="text-[#F5f5f5] uppercase text-xs">Apply</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-8">
          <p className="font-medium tracking-wide lg:text-base text-xs">
            Subtotal
          </p>
          <p className="font-light tracking-wide lg:text-base text-xs">
            {formatPrice(
              currency,
              cart?.reduce(
                (sum, item) => item.item.price * item.quantity + sum,
                0
              ) * rate
            )}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="font-medium tracking-wide lg:text-base text-xs">
            Shipping Fee
          </p>
          <p className="font-light tracking-wide lg:text-base text-xs">
            {formatPrice(currency, shippingFee)}
          </p>
        </div>
        <div className="flex items-center justify-between w-full mt-3">
          <p className="font-semibold tracking-wide lg:text-lg text-sm">
            Total
          </p>
          <p className="font-medium tracking-wide lg:text-lg text-sm">
            {formatPrice(
              currency,
              cart?.reduce(
                (sum, item) => item.item.price * item.quantity + sum,
                0
              ) *
                rate +
                shippingFee
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
