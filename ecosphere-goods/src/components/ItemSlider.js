import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Item from './Item';
import './ItemSlider.css'
import db, { collection, query, getDocs, orderBy, limit, where } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';

const ItemSlider = ({ nextButtonClass, prevButtonClass, sortBy }) => {
  const [products, setProducts] = useState([])
  const buttonStyle = 'cursor-pointer w-8 h-8 opacity-50 hover:opacity-100 text-dark-brown transition-opacity ease-in-out duration-2000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products')
        const q = query(productsRef, where('active', '==', true), orderBy(sortBy, 'asc'), limit(7))
        const querySnapShot = await getDocs(q)
        const products = [];

        const productPromises = querySnapShot.docs.map(async (productDoc) => {
          const productData = productDoc.data();
          const priceSnap = await getDocs(collection(productDoc.ref, 'prices'))

          const prices = priceSnap.docs.map((price) => ({
            priceId: price.id,
            priceData: price.data(),
          }));

          productData.prices = prices;
          products.push({ id: productDoc.id, ...productData});
        })

        await Promise.all(productPromises)
        setProducts(products)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [sortBy])
  
  return (
    <div className='p-4'>
      {products.length > 0 ? (
        <div>
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
            {Object.entries(products).map(([productId, productData]) => (
              <SwiperSlide key={productId} className="flex-shrink-0 w-72 p-6">
                <Item 
                  imageUrl={ productData.images[0] } 
                  price={ productData.prices[0].priceData.unit_amount } 
                  name={ productData.name }
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex relative justify-between align-middle top-1/2 space-x-6 p-8">
            <FaChevronLeft 
                className={`${prevButtonClass} ${buttonStyle}`}
            />
            <FaChevronRight
                className={`${nextButtonClass} ${buttonStyle}`}
            />
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex items-center justify-center'>
          <CircularProgress size={64} color="secondary" sx={{ color: '#362D2D' }}/>
        </div>
      )}
    </div>
  )
}

export default ItemSlider
