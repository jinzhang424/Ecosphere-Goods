import React from 'react'
import unitToDollarString from '../../utility-functions/unitToDollarString'
import QuantityAdjuster from '../utility/QuantityAdjuster'
import { addItem, removeItem } from '../../features/shoppingCartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const productData = product.product

  const handleIncrement = () => {
    dispatch(addItem(productData));
  };

  const handleDecrement = () => {
    dispatch(removeItem(productData));
  };

  return (
    <div className='w-full h-full flex bg-dark-brown bg-opacity-20 rounded-l-3xl overflow-hidden items-center'>
      <div className='flex w-1/2 items-center'>
        <img 
          src={ productData.images[0] } 
          alt="" 
          className='h-28 aspect-1/1 object-cover object-center'
        />
        <h1 className='text-center p-8'>{ productData.name }</h1>
      </div>
      
      <div className='flex w-1/2 h-full justify-between pr-6 items-center'>
        <h1>{ unitToDollarString(productData.prices[0].priceData.unit_amount) }</h1> {/* Price */}
        <div>
          <QuantityAdjuster 
            quantity={ product.quantity } 
            increment={ handleIncrement } 
            decrement={ handleDecrement }
          />
        </div>
        <h1>{ unitToDollarString(productData.prices[0].priceData.unit_amount * product.quantity) }</h1> {/* Total Price */}
      </div>
    </div>
  )
}

export default CartItem
