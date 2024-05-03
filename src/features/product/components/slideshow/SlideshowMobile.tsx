'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { ProductCustomImage } from '../product-custom-image/ProductCustomImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const SlideshowMobile = ({ images, title, className }: Props) => {
  if (images.length === 0) {
    return (
      <div className={className}>
        <div
          style={{
            width: '100vw',
            height: '420px',
          }}
        >
          <ProductCustomImage
            alt={title}
            width={600}
            height={500}
            className='object-fill h-full'
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '420px',
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className='mySwiper2'
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductCustomImage
              src={image}
              alt={title}
              width={600}
              height={500}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
