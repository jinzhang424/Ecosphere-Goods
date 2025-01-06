import React from 'react'

const CartItem = ({ imgUrl, price, qty = 1, total, className}) => {
  return (
    <div className={ className }>
      <img src={ imgUrl } alt="" />
      <h1>{ price }</h1>
      <h1>{ qty }.</h1>
      <h1>{ total }.</h1>
    </div>
  )
}

export default CartItem
