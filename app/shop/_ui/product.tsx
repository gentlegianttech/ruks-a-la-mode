"use client";

import Button from "@/app/ui/button";
import Incrementer from "@/app/ui/incrementer";
import { formatPrice } from "@/helpers/functions";
import { useAppContext } from "@/helpers/store";
import { ProductProps } from "@/helpers/types";
import Image from "next/image";
import { useState } from "react";

type ProductComponentProps = {
  addToBag: () => void;
  isInCart?: boolean;
  viewProduct?: () => void;
  product: any;
};

export default function Product({
  product,
  viewProduct,
  addToBag,
}: ProductComponentProps) {
  // const [numInCart, setNumInCart] = useState(0);
  const context = useAppContext();

  const { cart, setcart, exchangeRates, currency } = context;

  const itemIndex = cart?.findIndex((c) => c.item.id === product.id);

  const isProductInCart = itemIndex !== -1 ? true : false;

  // Add product to the cart
  const addToCart = () => {
    const newCart = [...(cart || [])];
    // if (isProductInCart) {
    //   newCart[itemIndex].quantity += 1;
    // } else {
    newCart.push({ item: product, quantity: 1 });
    // }
    setcart(newCart);
  };

  return (
    <div
      className={`${""} transition-transform duration-300 ease-out cursor-pointer hover:scale-105 flex flex-col items-center`}
    >
      <div onClick={viewProduct} className="">
        <div className="relative h-72">
          <Image
            fill={true}
            src={product?.data?.images[0]}
            alt={product?.data?.name}
            className="object-contain"
          />
        </div>
        {/* <div className=" absolute lg:top-5 lg:left-5 top-2 left-2 py-2 px-4 flex items-center justify-center rounded-full bg-white shadow-dark/20 shadow-md">
          <p className="text-xs uppercase opacity-60">{category}</p>
        </div> */}
        <p className="text-lg font-bold uppercase mb-2 text-center text-black/70">
          {product?.data?.name}
        </p>
        <p className="text-base font-semibold text-center text-black/80">
          {formatPrice(
            currency,
            product?.data?.price * exchangeRates[currency.toLowerCase()]
          )}
        </p>
      </div>
      <div className="mt-4">
        {product?.data?.colors.map((color: any, i: number) => (
          <span
            key={i}
            className="inline-block mr-2 w-5 h-5 rounded-full"
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
          ></span>
        ))}
      </div>
    </div>
  );
}
