import React from 'react'
import { Link } from 'react-router-dom';
import unitToDollarString from '../utilityFunctions/unitToDollarString';

const Item = ({imageUrl, price, name, productId}) => {

  return (
    <div className="p-6 w-full justify-between bg-dark-brown aspect-itemCard cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300">
      <Link to={`${productId}`}>
        <div className="h-4/6">
          <img src={imageUrl} alt="" className="object-cover w-full h-full"/>
        </div>
        <div className="flex flex-col justify-between h-2/6">
          <h1 className='text-off-white font-header text-subtitle mt-2'>{name}</h1>
          <h2 className='text-off-white font-header '>{unitToDollarString(price)}</h2>
        </div>
      </Link>
    </div>
  )
}

export default Item
