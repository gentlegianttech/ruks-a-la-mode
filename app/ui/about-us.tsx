import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="w-full lg:w-5/6 flex flex-col items-center justify-start mt-16 lg:mt-20 pb-20">
      <p className="uppercase text-lg lg:text-4xl font-black tracking-wide">
        ABOUT US
      </p>
      <div className="flex lg:items-start lg:flex-row items-center flex-col justify-center lg:space-x-2 w-full mt-10 px-5">
        <div className="lg:w-1/2 font-medium lg:mb-0 mb-5">
          <p className="lg:text-2xl text-sm lg:text-left text-center">
            At Ruks Á La Mode, we blend fashion with comfort, making chic style
            accessible to all! 🌟{" "}
          </p>
          <p className="lg:text-2xl text-sm lg:text-left text-center mt-6">
            Established in 2017 and proudly crafted in Abuja, Nigeria, we strive
            to provide you with the finest in style. With over 5,000 satisfied
            customers and 1M+ items sold in more than 20 countries.
          </p>
          <p className="lg:text-2xl text-sm lg:text-left text-center mt-6">
            Every item is custom made to order, guaranteeing a flawless fit and
            a wardrobe that reflects your individuality. The best part? We ship
            worldwide, so you can enjoy our stunning pieces wherever you are!
          </p>
        </div>
        <div className="relative w-32 h-48 lg:w-44 lg:h-72">
          <Image
            fill={true}
            src="/images/banners/about.png"
            alt="about-us"
            sizes="33vw"
          />
        </div>
      </div>
    </div>
  );
}
