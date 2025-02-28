import { ProductProps } from "@/helpers/types";
import {
  abujaDeliveryFees,
  countryGroups,
  internationalDeliveryFees,
  nigeriaDeliveryFees,
} from "./shipping-fees";

const abuja_cities: any = {
  asokoro: 4500,
};

export const slugify = (text: string) => {
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "") ?? ""
  );
};

export const formatPrice = (currency: string, price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  const formattedPrice = formatter.format(price);
  return formattedPrice;
};

// These options are needed to round to whole numbers if that's what you want.
//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)

export function groupMerchByCategory(
  merch: any[]
): Record<string, ProductProps[]> {
  return merch?.reduce((acc: Record<string, ProductProps[]>, item: any) => {
    if (!acc[item?.category]) {
      acc[item?.category] = [];
    }
    acc[item?.category].push(item);
    return acc;
  }, {});
}
function getRegionByCountry(country: any) {
  for (const [region, countries] of Object.entries(countryGroups)) {
    if (countries.includes(country)) {
      return region;
    }
  }
  return "Unknown Region";
}

export function getShippingFee(address: any, weight: number, type?: any) {
  const { state, country, city } = address;

  if (country?.toLowerCase() === "nigeria") {
    if (state?.toLowerCase() === "abuja") {
      if (!abujaDeliveryFees?.hasOwnProperty(city?.toLowerCase())) {
        return alert("Invalid Abuja City.");
      } else {
        return abujaDeliveryFees[city];
      }
    }

    let fee: any = nigeriaDeliveryFees?.find(
      (n) => weight >= n.min && weight < n.max
    );
    return fee ? fee[type] : alert("Overweight");
  }

  let region = getRegionByCountry(country);

  if (region === "UNKNOWN") {
    return alert("We don't deliver to this location yet.");
  }

  let fee: any = internationalDeliveryFees?.find(
    (i) => weight >= i.min && weight < i.max
  );

  return fee ? fee[region] : alert("Overweight");
}
