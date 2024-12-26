import React from 'react'

const Item = ({imageUrl, price, name}) => {
  return (
    <div className="p-6 w-80 justify-between bg-dark-brown aspect-w-6 aspect-itemCard">
      <div className="h-4/6">
        <img src={imageUrl} alt="" className="object-cover w-full h-full"/>
      </div>
        <div className="flex flex-col justify-between h-2/6">
          <h1 className='text-off-white font-header text-subtitle mt-2'>{name}</h1>
          <h2 className='text-off-white font-header '>${price}</h2>
        </div>
    </div>
  )
}

export default Item
