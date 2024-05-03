'use client';

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { ProductCustomImage } from '../product-custom-image/ProductCustomImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const Slideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (images.length === 0) {
    return (
      <div className={className}>
        <ProductCustomImage
          alt={title}
          width={1024}
          height={800}
          className='rounded-lg object-fill '
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000 }}
        thumbs={{
          // swiper: thumbsSwiper
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductCustomImage
              src={image}
              alt={title}
              width={1024}
              height={800}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductCustomImage
              src={image}
              alt={title}
              width={300}
              height={300}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
