import { ProductCatalogContext } from "./ProductCatalogContext";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import OpacityButton from "../../../utility/general-buttons/OpacityButton";

export default function ConfirmDeleteDialog({ productId, productName }) {
    const [open, setOpen] = useState(false);
    const { handleConfirmDelete } = useContext(ProductCatalogContext)
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event) => {
        setLoading(true)
        await handleConfirmDelete(event, productId)
        setLoading(false)
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
                            <OpacityButton bgColor="bg-green-600" onClick={handleDelete} label='Yes' loading={loading}/>
                            <OpacityButton bgColor="bg-red-600" onClick={handleClose} label='No'/>
                        </div>
                    </div>
                </dialog>
            </>
                )
            }
        </div>
    );
    }