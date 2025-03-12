import React, { useState } from 'react';
import OrderStatus from '../../pages/dashboard/orders-page/OrderStatus';
import { updateOrderStatus } from '../../../api/orderHandling';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { FaCaretDown } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';

export default function OrderStatusSelector({ initialStatus, orderID, uid }) {
  const [orderStatus, setOrderStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusOptions = ['Cancelled', 'Pending', 'Delivered'];

  const handleSelect = async (option) => {
    setOpen(false)

    setLoading(true);
    await handleUpdateOrderStatus(option);
    setLoading(false);
    
    setOrderStatus(option);
  }

  const handleUpdateOrderStatus = async (option) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await updateOrderStatus(orderID, uid, option, idToken);

      toast.success('Successfully updated order status');
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='w-36 cursor-pointer'>
      {/** Invisible background for closing the menu */}
      <div className={`fixed opacity-0 inset-0 z-0 bg-dark-brown ${ !open && 'hidden'}`}
        onClick={() => setOpen(false)}
      />

      {/** Displaying the status */}
      <button onClick={() => setOpen(true)} className='w-full'>
        <OrderStatus orderStatus={orderStatus}>
          <div className='flex justify-center items-center'>
            <CircularProgress className={`absolute ${!loading && 'opacity-0'}`} size={12} thickness={7}/>
            <FaCaretDown className={`absolute ${loading && 'opacity-0'}`} size={16}/>
          </div>
        </OrderStatus>
      </button>

      {/** Status options */}
      <div className={`flex flex-col absolute z-10 items-center justify-center bg-off-white rounded-lg w-36 mt-2 overflow-hidden opacity-0 ${ open ? 'opacity-100 scale-100' : 'pointer-events-none scale-90'} transition-all ease-in-out duration-100`}>
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