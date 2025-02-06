"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductProps, SharedState } from "./types";
import { getExchangeRates } from "./api-controller";

const AppContext = createContext<SharedState>({} as SharedState);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [cart, setcart] = useState<any>([]);
  const [user, setuser] = useState<any>(undefined);

  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );

  const currencies = ["NGN", "USD", "EUR", "GBP"];

  const [currency, setCurrency] = useState("NGN");

  const [all_products, set_all_products] = useState([
    {
      images: ["/images/products/oversized.png"],
      name: "FOLA SHIRT DRESS",
      price: 45000,
      category: "dress",
      quantity: 10,
      description: "Cotton (Pink & Green are Striped)",
      id: "00000",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffc0cb", name: "pink" },
      ],
      materialOptions: [
        { price: 45000, stock: 5, name: "cotton", weight: 50 },
        { name: "denim", price: 55000, stock: 5, weight: 55 },
      ],
      weight: 50,
    },
    {
      images: ["/images/products/riri.png"],
      name: "RIRI SKIRT & BLOUSE",
      price: 90000,
      category: "two-piece",
      quantity: 10,
      description: "Linen 2pc Set with Bow",
      id: "000103",
      colors: [{ hexCode: "#0e0e0e", name: "black" }],
      weight: 50,
    },
    {
      images: ["/images/products/bria.png"],
      name: "BRIA TWO PIECE",
      price: 35000,
      category: "two-piece",
      quantity: 10,
      description: "Linen/Cotton 2pc Set",
      id: "000182",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffff00", name: "yellow" },
      ],
      components: [
        { id: "001", name: "Skirt Only", price: 18000, weight: 30, stock: 10 },
      ],
      weight: 50,
    },
    {
      images: ["/images/products/oversized.png"],
      name: "FOLA SHIRT DRESS",
      price: 45000,
      category: "dress",
      quantity: 10,
      description: "Cotton (Pink & Green are Striped)",
      id: "090040",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffc0cb", name: "pink" },
      ],
      materialOptions: [
        { price: 45000, stock: 5, name: "cotton", weight: 50 },
        { name: "denim", price: 55000, stock: 5, weight: 55 },
      ],
      weight: 50,
    },
    {
      images: ["/images/products/riri.png"],
      name: "RIRI SKIRT & BLOUSE",
      price: 90000,
      category: "two-piece",
      quantity: 10,
      description: "Linen 2pc Set with Bow",
      id: "220103",
      colors: [{ hexCode: "#0e0e0e", name: "black" }],
      weight: 50,
    },
    {
      images: ["/images/products/bria.png"],
      name: "BRIA TWO PIECE",
      price: 35000,
      category: "two-piece",
      quantity: 10,
      description: "Linen/Cotton 2pc Set",
      id: "03402",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffff00", name: "yellow" },
      ],
      components: [
        { id: "001", name: "Skirt Only", price: 18000, weight: 30, stock: 10 },
      ],
      weight: 50,
    },
    {
      images: ["/images/products/oversized.png"],
      name: "FOLA SHIRT DRESS",
      price: 45000,
      category: "dress",
      quantity: 10,
      description: "Cotton (Pink & Green are Striped)",
      id: "043201",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffc0cb", name: "pink" },
      ],
      materialOptions: [
        { price: 45000, stock: 5, name: "cotton", weight: 50 },
        { name: "denim", price: 55000, stock: 5, weight: 55 },
      ],
      weight: 50,
    },
    {
      images: ["/images/products/riri.png"],
      name: "RIRI SKIRT & BLOUSE",
      price: 90000,
      category: "two-piece",
      quantity: 10,
      description: "Linen 2pc Set with Bow",
      id: "002173",
      colors: [{ hexCode: "#0e0e0e", name: "black" }],
      weight: 50,
    },
    {
      images: ["/images/products/bria.png"],
      name: "BRIA TWO PIECE",
      price: 35000,
      category: "two-piece",
      quantity: 10,
      description: "Linen/Cotton 2pc Set",
      id: "055512",
      colors: [
        { hexCode: "#0e0e0e", name: "black" },
        { hexCode: "#ffff00", name: "yellow" },
      ],
      components: [
        { id: "001", name: "Skirt Only", price: 18000, weight: 30, stock: 10 },
      ],
      weight: 50,
    },
  ]);

  const fetchRates = async () => {
    const rates = await getExchangeRates();
    return rates;
  };

  useEffect(() => {
    const rates = fetchRates().then((data) => {
      console.log(data.ngn);
      const { usd, eur, gbp } = data?.ngn;

      setExchangeRates({ usd, eur, gbp, ngn: 1 });
    });
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<any>();
  const sharedState: SharedState = {
    cart,
    setcart,
    all_products,
    set_all_products,
    selectedProduct,
    setSelectedProduct,
    currency,
    setCurrency,
    currencies,
    user,
    setuser,
    exchangeRates,
    setExchangeRates,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
