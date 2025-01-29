import { ProductCatalogContext } from "./ProductCatalogContext";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ConfirmDeleteDialog({ productId, productName }) {
    const [open, setOpen] = useState(false);
    const buttonStyle = 'text-xl text-off-white p-1 pl-4 pr-4 rounded-lg bg-opacity-85 hover:bg-opacity-100'
    const { handleConfirmDelete } = useContext(ProductCatalogContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event) => {
        await handleConfirmDelete(event, productId)
        handleClose()
    }

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
                            <button className={`${buttonStyle} bg-green-600`} onClick={handleDelete}>Yes</button>
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