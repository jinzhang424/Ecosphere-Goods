import React from 'react'
import unitToDollarString from '../utilityFunctions/unitToDollarString';

const ProductCard = ({ productData }) => {

  const price = unitToDollarString(productData.prices[0]?.priceData?.unit_amount)

  return (
    <div className="p-6 w-full justify-between bg-dark-brown aspect-itemCard cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300 rounded-xl">
      <div className="h-1/2">
        <img src={productData.images[0]} alt="" className="object-cover w-full h-full object-center rounded-xl"/>
      </div>
      
      <span className="flex flex-col text-left justify-between h-1/2 text-off-white">
        <h1 className='font-header text-lg mt-2'>{productData.name}</h1>

        <h2 className='font-header '>{price}</h2>
      </span>
    </div>
  )
}

export default ProductCard
