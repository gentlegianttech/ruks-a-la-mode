import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full py-16 bg-[#D8B283] bg-opacity-40 flex items-center justify-center mt-20 mb-28 px-10">
      <div className="lg:w-2/3 items-center flex flex-col justify-center">
        <p className="lg:text-sm text-xs text-center font-medium leading-loose tracking-widest mb-9 uppercase">
          Attainable, Comfortable & Chic.
        </p>
        <p className="text-xs text-center font-medium leading-loose tracking-wider">
          At Ruks Á La Mode, we blend fashion with comfort, making chic style
          accessible to all! Every item is custom-made to order, guaranteeing a
          flawless fit and a wardrobe that reflects your individuality.
        </p>
        <Link href="">
          <p className="mt-10 text-[10px] font-semibold underline">SHOP NOW</p>
        </Link>
      </div>
    </div>
  );
}
