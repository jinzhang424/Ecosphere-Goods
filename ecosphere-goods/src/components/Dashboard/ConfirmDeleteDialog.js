import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { deleteProduct } from "../../utilityFunctions/productHandling";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function ConfirmDeleteDialog({ productId, productName }) {
    const [open, setOpen] = useState(false);
    const buttonStyle = 'text-xl text-off-white p-1 pl-4 pr-4 rounded-lg bg-opacity-85 hover:bg-opacity-100'
    const user = useSelector(selectUser)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async (event) => {
        event.preventDefault();

        try {
            await deleteProduct(productId, user.uid)

            handleClose()
            toast.success('Successfully deleted product.')
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to delete product.')
        }
    };

    return (
        <div className='flex items-center'>
            <button 
                className='flex items-center'
                onClick={ handleClickOpen }
            >
                <FaTrash className='w-5 h-5 text-red-600 opacity-70 hover:opacity-100'/>
            </button>
            { open && (
            <>
                <div className='fixed inset-0 bg-black bg-opacity-50' onClick={ handleClose }></div>
                
                <dialog open className='flex flex-col fixed inset-0 z-40 w-7/12 p-10 pr-12 pl-12 bg-off-white rounded-3xl h-fit'>
                    <div className='flex justify-between items-center'>
                        <span className='flex text-xl font-header text-dark-brown space-x-4'> 
                            <p className='opacity-80'>Are you sure you want to delete:</p>
                            <p>{ productName }?</p>
                        </span>
                        
                        <div className='space-x-6 flex items-center'>
                            <button className={`${buttonStyle} bg-green-600`} onClick={handleConfirmDelete}>Yes</button>
                            <button className={`${buttonStyle} bg-red-600`} onClick={handleClose}>No</button>
                        </div>
                    </div>
                </dialog>
            </>
                )
            }
        </div>
    );
    }