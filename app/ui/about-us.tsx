import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full py-16 bg-[#D8B283] flex items-center justify-center mt-20 mb-28 px-10">
      <div className="lg:w-[44%] items-center flex flex-col justify-center">
        <p className="lg:text-sm text-xs text-center font-semibold leading-loose tracking-wider">
          Attainable, Comfortable & Chic. At Ruks Á La Mode, we blend fashion
          with comfort, making chic style accessible to all! Every item is
          custom-made to order, guaranteeing a flawless fit and a wardrobe that
          reflects your individuality.
        </p>
        <Link href="">
          <p className="mt-10 text-xs lg:text-sm font-bold underline">
            SHOP NOW
          </p>
        </Link>
      </div>
    </div>
  );
}
