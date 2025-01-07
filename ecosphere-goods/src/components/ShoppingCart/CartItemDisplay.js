import React from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '../../features/shoppingCartSlice'
import CartItem from './CartItem'

const CartItemDisplay = () => {
  const cart = useSelector( selectCart )

  return (
    <div className='w-full h-full space-y-4'>
        <header className='w-full flex justify-between p-6 border-b-2 border-dark-brown border-opacity-40'>
          <div className='w-1/2'>
            <h1>Product</h1>
          </div>
          <div className='flex w-1/2 justify-between'>
              <h1>Price</h1>
              <h1>Qty.</h1>
              <h1>Total</h1>
          </div>
        </header>

        <div className='space-y-4 overflow-y-scroll h-5/6'>
          {Object.entries(cart).map(([productId, product]) => (
            <div key={ productId }>
              <CartItem product={ product }/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default CartItemDisplay
