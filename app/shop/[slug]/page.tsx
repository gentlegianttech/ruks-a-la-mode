"use client";

import Incrementer from "@/app/ui/incrementer";
import SimilarProducts from "@/app/ui/similar-products";
import SizeGuide from "@/app/ui/size-guide";
import { useAppContext } from "@/helpers/store";
// import { bungee, inter } from "@/styles/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import PartSelector from "../_ui/part-selector";
import MaterialSelector from "../_ui/material-selector";
import Button from "@/app/ui/button";
import { formatPrice } from "@/helpers/functions";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default function Page(props: { params: Params }) {
  const [openCustom, setOpenCustom] = useState(false);
  const params = use(props.params);
  const { slug } = params;
  const router = useRouter();
  const context = useAppContext();
  const {
    selectedProduct,
    cart,
    setcart,
    all_products,
    currency,
    exchangeRates,
  } = context;

  const sizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

  const lengths = [
    "Petite",
    "Petite+",
    "Average",
    "Average+",
    "Tall",
    "Very Tall",
  ];

  const [measurement, setMeasurement] = useState({
    size: "",
    length: "",
    custom: {
      bust: "",
      waist: "",
      hips: "",
      "dress/pants length": "",
      height: "",
    },
  });

  const [selectedPart, setSelectedPart] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    material: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const [selectedMaterial, setSelectedMaterial] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
  });
  const itemIndex = context?.cart?.findIndex((c) => c.item.id === slug);

  const isProductInCart = itemIndex !== -1 ? true : false;

  const viewProduct = (id: string) => {
    router.push(`/shop/${id}`);
  };

  // Handle decreasing product quantity
  const handleLeftClick = () => {
    if (!isProductInCart) return;

    const newCart = [...cart];
    const productInCart = newCart[itemIndex];

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      // Remove product from the cart when quantity is 0
      newCart.splice(itemIndex, 1);
    }

    setcart(newCart);
  };

  // Handle increasing product quantity
  const handleRightClick = () => {
    if (!isProductInCart) return;

    const newCart = [...cart];
    newCart[itemIndex].quantity += 1;

    setcart(newCart);
  };

  // Function to get the correct price based on selection
  const getPrice = () => {
    if (selectedPart?.name) {
      // If a part is selected, check if it has materialOptions
      if (selectedMaterial?.name) {
        return selectedMaterial.price;
      }
      return selectedPart.price;
    }

    // If no part is selected, check if the product has materialOptions
    if (selectedMaterial?.name) {
      return selectedMaterial.price;
    }

    // Fallback to product base price
    return selectedProduct?.data?.price ?? 0;
  };

  const addToBag = () => {
    if (selectedProduct) {
      const { size, custom, length } = measurement;

      if (!size && !custom && !length) {
        return alert("Incomplete Measurement Parameters");
      }

      const filteredMeasurement = Object.fromEntries(
        Object.entries(measurement).filter(([_, value]) => value !== "")
      );

      const itemData: any = {
        item: {
          name: selectedProduct?.data?.name,
          price: getPrice(),
          id: selectedProduct?.id,
          image: selectedProduct?.data?.images[0],
          stock: selectedPart?.name
            ? selectedPart?.material
              ? selectedPart?.material?.stock
              : selectedPart?.stock
            : selectedMaterial?.name
            ? selectedMaterial?.stock
            : selectedProduct?.data?.quantity,
          measurement: filteredMeasurement,
        },
        quantity: orderDetails?.quantity,
      };
      if (selectedPart?.name) {
        itemData.item["selectedPart"] = selectedPart;
        itemData.item["name"] += ` (${selectedPart?.name})`;
      }
      if (selectedMaterial?.name) {
        itemData.item["selectedMaterial"] = selectedMaterial;
        itemData.item["name"] += ` (${selectedMaterial?.name})`;
      }
      context?.setcart([...context?.cart, itemData]);
    }
  };

  useEffect(() => {
    if (!selectedProduct) router.push("/shop");
  }, []);
  // if (isLoading) {
  //   return <Blocks />;
  // }

  return (
    <div className={`flex flex-col w-full lg:px-24 px-8  text-black/80  pb-10`}>
      <div className="flex lg:flex-row  flex-col lg:items-start lg:justify-center items-center lg:space-x-16 w-full lg:mt-10">
        <div className="lg:w-[480px] lg:h-[600px] w-[250px] h-[350px] relative lg:mt-0 mt-8">
          <Image
            alt="merch"
            src={selectedProduct?.data?.images[0] ?? null}
            fill={true}
          />
        </div>
        <div className="flex flex-col lg:items-start items-center lg:w-2/5 w-full lg:mt-0 mt-10">
          <p className="lg:text-4xl text-2xl font-bold tracking-wider text-center">
            {selectedProduct?.data?.name}
          </p>
          <p className={`mt-4 lg:text-lg font-medium tracking-wide`}>
            {formatPrice(
              currency,
              getPrice() *
                exchangeRates[currency.toLowerCase()] *
                orderDetails.quantity
            )}
          </p>
          <p className="mt-6 tracking-wider lg:text-base font-medium text-sm">
            {selectedProduct?.data?.description}
          </p>
          <div className="mt-4">
            {selectedProduct?.data?.colors.map((color: any, i: number) => (
              <span
                key={i}
                className="inline-block mr-2 w-5 h-5 rounded-full"
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              ></span>
            ))}
          </div>
          {selectedProduct?.data?.components?.length > 0 && (
            <PartSelector
              components={selectedProduct?.data?.components}
              onSelectPart={(selected: any) => setSelectedPart(selected)}
              selectedPart={selectedPart?.name}
            />
          )}
          {selectedProduct?.data?.materialOptions?.length > 0 && (
            <MaterialSelector
              materials={selectedProduct?.data?.materialOptions}
              onSelectPart={(selected) => setSelectedMaterial(selected)}
              selectedPart={selectedMaterial?.name}
            />
          )}
          <div className="mt-6 w-full flex flex-col lg:items-start items-center justify-start">
            <div>
              <label className="text-sm">
                Size
                <select
                  className="border ml-2 mr-4 border-dark outline-none rounded-lg bg-transparent"
                  onChange={(e) =>
                    setMeasurement({ ...measurement, size: e.target.value })
                  }
                >
                  {sizes?.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Length
                <select
                  className="border ml-2 border-dark outline-none rounded-lg bg-transparent"
                  onChange={(e) =>
                    setMeasurement({ ...measurement, length: e.target.value })
                  }
                >
                  {lengths?.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-10 w-full flex flex-col lg:items-start items-center">
              {openCustom ? (
                <CustomMeasurement
                  measurement={measurement}
                  setMeasurement={setMeasurement}
                  setOpenCustom={setOpenCustom}
                />
              ) : (
                <Button
                  label="Custom Size"
                  onClick={() => setOpenCustom(true)}
                />
              )}
            </div>
            <Link href=""></Link>
            {/* <input
              className="border border-dark bg-transparent text-sm p-2 mt-4 outline-none"
              placeholder="Measurement (inches)"
              value={measurement?.custom}
              onChange={(e) =>
                setMeasurement({ ...measurement, custom: e.target.value })
              }
            /> */}
          </div>
          {/* <SizeGuide
            measurement={measurement}
            setMeasurement={setMeasurement}
          /> */}
          {isProductInCart ? (
            <></>
          ) : (
            <div className="mt-10 flex flex-col lg:items-start items-center">
              <p>Quantity</p>
              <div className="mt-4 w-40 py-2 px-3 rounded-lg border-dark border ">
                <Incrementer
                  leftClick={() =>
                    setOrderDetails({
                      ...orderDetails,
                      quantity:
                        orderDetails.quantity > 0
                          ? orderDetails.quantity - 1
                          : orderDetails.quantity,
                    })
                  }
                  rightClick={() =>
                    setOrderDetails({
                      ...orderDetails,
                      quantity:
                        selectedProduct?.quantity &&
                        orderDetails.quantity < selectedProduct?.quantity
                          ? orderDetails.quantity + 1
                          : orderDetails.quantity,
                    })
                  }
                  value={orderDetails?.quantity}
                />
              </div>
            </div>
          )}

          {isProductInCart ? (
            <Incrementer
              leftClick={handleLeftClick}
              rightClick={handleRightClick}
              value={cart[itemIndex].quantity}
            />
          ) : (
            <div className="mt-8 pb-10">
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#1B1B1B"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                }
                label="Add To Bag"
                onClick={addToBag}
              />
            </div>
          )}
        </div>
      </div>
      <SimilarProducts
        items={all_products
          ?.filter(
            (p: any) => p?.data?.category === selectedProduct?.data?.category
          )
          .filter((p: any) => p.id !== selectedProduct?.id)
          .slice(0, 4)}
        viewProduct={viewProduct}
      />
    </div>
  );
}

const CustomMeasurement = ({
  measurement,
  setMeasurement,
  setOpenCustom,
}: {
  measurement: any;
  setMeasurement: any;
  setOpenCustom: any;
}) => (
  <div className="flex flex-col lg:items-start items-center w-full">
    <p
      className="font-bold underline cursor-pointer mb-3"
      onClick={() => setOpenCustom(false)}
    >
      ✕
    </p>
    {Object.keys(measurement?.custom)?.map((m) => (
      <div
        key={m}
        className="flex items-center justify-between mb-4 lg:w-[60%] w-full"
      >
        <p className="capitalize lg:text-sm text-xs">{m}</p>
        <div className="flex items-center justify-start">
          <input
            className="bg-transparent lg:text-sm text-xs border-dark border rounded-lg mr-3 px-3 outline-none"
            value={measurement[m]}
            onChange={(e) =>
              setMeasurement({
                ...measurement,
                custom: { ...measurement?.custom, [m]: e.target.value },
              })
            }
          />
          <p className="text-xs">in</p>
        </div>
      </div>
    ))}
  </div>
);
