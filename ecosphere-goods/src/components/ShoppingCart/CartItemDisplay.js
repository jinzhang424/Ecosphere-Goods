import React from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '../../features/shoppingCartSlice'
import CartItem from './CartItem'

const CartItemDisplay = ({ className }) => {
  const cart = useSelector( selectCart )

  return (
    <div className={ className }>
        <header className='flex justify-between p-6 border-b-2 border-dark-brown border-opacity-40'>
            <h1>Product</h1>
            <div className='flex space-x-32'>
                <h1>Price</h1>
                <h1>Qty.</h1>
                <h1>Total</h1>
            </div>
        </header>

        <div>
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
