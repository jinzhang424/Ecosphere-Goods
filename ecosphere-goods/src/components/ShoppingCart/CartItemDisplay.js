import React from 'react'

const CartItemDisplay = ({ className }) => {
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
    </div>
  )
}

export default CartItemDisplay
