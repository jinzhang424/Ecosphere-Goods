import React, { useState } from 'react'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import QuantityAdjuster from '../utility/QuantityAdjuster'

const CartItem = ({ product }) => {
  console.log('PRODUCT:', product)

  const productData = product.product
  const [quantity, setQuantity] = useState(product.quantity)

  console.log('PRODUCT DATA:', productData)
  console.log('PRODUCT QUANTITY:', quantity)

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className='w-full h-full flex bg-dark-brown bg-opacity-20 rounded-l-3xl overflow-hidden items-center'>
      <div className='flex w-1/2 items-center'>
        <img 
          src={ productData.images[0] } 
          alt="" 
          className='h-28 aspect-1/1 object-cover object-center'
        />
        <h1 className='text-center p-8'>{ product.name }</h1>
      </div>
      
      <div className='flex w-1/2 h-full justify-between pr-6 items-center'>
        <h1>{ unitToDollarString(productData.prices[0].priceData.unit_amount) }</h1> {/* Price */}
        <div><QuantityAdjuster quantity={ quantity } increment={incrementQuantity} decrement={decrementQuantity}/></div> {/* Adjust Quantity */}
        <h1>{ unitToDollarString(productData.prices[0].priceData.unit_amount * quantity) }</h1> {/* Total Price */}
      </div>
    </div>
  )
}

export default CartItem
