import React, { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import OrderStatus from '../../pages/dashboard/orders-page/OrderStatus';

export default function OrderStatusSelector({ initialStatus }) {
  const [orderStatus, setOrderStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false)
  const statusOptions = ['Cancelled', 'Pending', 'Delivered'];

  const handleSelect = (option) => {
    setOrderStatus(option);
    setOpen(false);
  }

  return (
    <div className='w-32 cursor-pointer'>
      {/** Invisible background for closing the menu */}
      <div className={`fixed opacity-0 inset-0 z-0 bg-dark-brown ${ !open && 'hidden'}`}
        onClick={() => setOpen(false)}
      />

      {/** Displaying the status */}
      <button onClick={() => setOpen(true)} className='w-full'>
        <OrderStatus orderStatus={orderStatus}/>
      </button>

      {/** Status options */}
      <div className={`flex flex-col absolute z-10 items-center justify-center bg-off-white rounded-lg w-32 mt-2 overflow-hidden opacity-0 ${ open ? 'opacity-100 scale-100' : 'pointer-events-none scale-90'} transition-all ease-in-out duration-100`}>
        {statusOptions.map((option) => (
          <div 
            key={option} 
            className="p-2 pl-4 pr-4 cursor-pointer text-center text-dark-brown font-header hover:bg-stone-400 w-full transition-all ease-in-out duration-100"
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}