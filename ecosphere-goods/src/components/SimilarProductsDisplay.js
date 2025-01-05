import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Item from './Item';
import './ItemSlider.css'

const SimilarProductsDisplay = ({ data }) => {
  
  return (
      <div className='flex p-4 w-full items-center justify-between'>
        {/* <FaChevronLeft 
            className={`${prevButtonClass} cursor-pointer w-8 h-8 opacity-50 hover:opacity-100 text-dark-brown transition-opacity ease-in-out duration-2000`}
        /> */}

        <div className='w-full'>
            {Object.entries(data).map(([productID, product]) => (
                <div key={ productID } className='w-60'>
                    <Item 
                        imageUrl={product.images[0]} 
                        price={product.prices[0].priceData.unit_amount / 100} 
                        name={ product.name }
                        className='w-fit h-fit'
                    /> 
                </div>
            ))}
        </div>

        {/* <FaChevronRight
            className={`${nextButtonClass} cursor-pointer w-8 h-8 opacity-50 hover:opacity-100 text-dark-brown transition-opacity ease-in-out duration-2000`}
        /> */}
    </div>
  )
}

export default SimilarProductsDisplay
