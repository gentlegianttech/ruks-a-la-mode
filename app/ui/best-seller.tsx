"use client";

import CategoryGrid from "../shop/_ui/category-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveProducts } from "@/helpers/api-controller";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function BestSeller() {
  const router = useRouter();

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllActiveProducts(),
  });

  const products: any = allProducts?.products;

  const viewProduct = (id: string) => {
    router.push(`/shop/${id}`);
  };

  if (isLoading)
    return (
      <div className="w-full mt-6 flex flex-col items-center justify-center">
        <TailSpin />
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center justify-start mt-10 lg:mt-20">
      <p className="uppercase text-lg lg:text-4xl font-black tracking-wide">
        BEST SELLERs
      </p>
      <p className="text-xs lg:text-sm lg:w-2/3 text-center mt-4">
        Our Customers Can't Seem To Get Enough Of These
      </p>
      <CategoryGrid items={products} viewProduct={viewProduct} />
    </div>
  );
}
