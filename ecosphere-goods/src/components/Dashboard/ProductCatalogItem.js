import React from 'react'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import { FaTrash } from "react-icons/fa";

const ProductCatalogItem = (productData) => {
    const imgUrl = productData.productData.images[0]
    const name = productData.productData.name
    const unitAmount = productData.productData.prices[0].priceData.unit_amount
    const category = productData.productData.stripe_metadata_itemCategory
    const dateCreated = productData.productData.date_created

    const date = new Date(dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();

    const handleDelete = () => {
        console.log('trying to delete')
    }

    return (
        <span className='flex justify-between items-center text-dark-brown font-header h-16 pr-12 bg-dark-brown bg-opacity-10 rounded-xl overflow-hidden'>
            <img 
                src={ imgUrl } 
                className='aspect-square object-cover h-16 w-16' 
            />
            
            <p className='text-center w-48'>{ name }</p>
            <p className='text-center w-24'>{ dateString }</p>
            <p className='text-center w-24'>{ category }</p>
            <p className='text-center w-24'>{ unitToDollarString(unitAmount) }</p>
            <button onClick={ handleDelete }><FaTrash className='w-5 h-5 text-red-600 opacity-70 hover:opacity-100'/></button>
        </span>
    )
}

export default ProductCatalogItem
