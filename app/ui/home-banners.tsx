"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeBanners() {
  const banners = [
    { id: 1, image: "/images/banners/banner1.jpg", alt: "banner 1" },
    { id: 2, image: "/images/banners/banner1.jpg", alt: "banner 2" },
    { id: 3, image: "/images/banners/banner1.jpg", alt: "banner 3" },
  ];
  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full lg:bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
