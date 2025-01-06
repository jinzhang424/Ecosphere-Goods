import React, { useState } from 'react'

const CartItem = ({ product, className='' }) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className={ className }>
      <div className='flex w-full h-full space-x-8'>
        <img 
          src={ product.images[0] } 
          alt="" 
          className='h-48 aspect-1/1 object-cover object-center'
        />
        
        <h1>{ product.name }</h1>
        <h1>'$10.00'</h1>
        <h1>{ quantity }</h1>
        <h1>'$10.00'</h1>
      </div>
    </div>
  )
}

export default CartItem
