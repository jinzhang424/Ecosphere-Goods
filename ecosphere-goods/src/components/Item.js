import React from 'react'
import { Link } from 'react-router-dom';
import unitToDollarString from '../utilityFunctions/unitToDollarString';

const Item = ({ productData }) => {

  console.log(productData)

  return (
    <div className="p-6 w-full justify-between bg-dark-brown aspect-itemCard cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300">
      <div className="h-4/6">
        <img src={productData.images[0]} alt="" className="object-cover w-full h-full"/>
      </div>
      <div className="flex flex-col justify-between h-2/6">
        <h1 className='text-off-white font-header text-subtitle mt-2'>{productData.name}</h1>
        <h2 className='text-off-white font-header '>{unitToDollarString(productData.prices[0]?.priceData?.unit_amount)}</h2>
      </div>
    </div>
  )
}

export default Item
