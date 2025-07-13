import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";


function VerticalSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        direction="vertical"
        loop={true}
        mousewheel={{ releaseOnEdges: true }}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Mousewheel]}
        className="h-96"
      >
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 1</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 3</span>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Optional Pagination Positioning Override */}
      <style>{`
        .swiper-pagination {
          position: absolute;
          right: 2.5rem;
          top: 33%;
          transform: translateY(2rem);
        }
        .swiper-pagination-bullet {
          background: #4F46E5;
        }
        .swiper-pagination-bullet-active {
          background: #4F46E5 !important;
        }
      `}</style>
    </div>
  )
}

export default VerticalSlider;