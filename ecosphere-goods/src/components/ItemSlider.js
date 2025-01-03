import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import heroSliderData from '../data/heroSliderData.json';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Item from './Item';
import './ItemSlider.css'

const ItemSlider = ({ nextButtonClass, prevButtonClass }) => {
  
  return (
      <div className='p-4'>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {heroSliderData.map((item, index) => (
            <SwiperSlide key={index} className="flex-shrink-0 w-72">
              <Item imageUrl={item.url} price="9.00" name="Lorem Ipsum"></Item>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex relative justify-between align-middle top-1/2 space-x-6 p-8">
            <FaChevronLeft 
                className={`${prevButtonClass} cursor-pointer w-8 h-8 opacity-50 hover:opacity-100 text-dark-brown transition-opacity ease-in-out duration-2000`}
            />
            <FaChevronRight
                className={`${nextButtonClass} cursor-pointer w-8 h-8 opacity-50 hover:opacity-100 text-dark-brown transition-opacity ease-in-out duration-2000`}
            />
        </div>
      </div>
  )
}

export default ItemSlider
