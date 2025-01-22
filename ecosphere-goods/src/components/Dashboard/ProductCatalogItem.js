import React from 'react'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import ConfirmationDialog from './ConfirmationDialog';
import ProductDialog from './ProductDialog';
import { FaEdit } from "react-icons/fa";

const ProductCatalogItem = (productData) => {
    const imgUrl = productData.productData.images[0]
    const name = productData.productData.name
    const price = unitToDollarString(productData.productData.prices[0].priceData.unit_amount)
    const subcategory = productData.productData.stripe_metadata_itemSubcategory
    const dateCreated = productData.productData.date_created

    const date = new Date(dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();

    return (
        <span className='flex bg-dark-brown bg-opacity-10 rounded-xl overflow-hidden'>
            <div className='flex justify-between items-center text-dark-brown font-header h-16 pr-12 w-11/12'>
                <img 
                    src={ imgUrl } 
                    className='aspect-square object-cover h-16 w-16' 
                />
                
                <p className='text-center w-48'>{ name }</p>
                <p className='text-center w-24'>{ dateString }</p>
                <p className='text-center w-24'>{ subcategory }</p>
                <p className='text-center w-24'>{ price }</p>   
            </div>

            <div className='flex space-x-4 items-center'>
                <ProductDialog isEditing={ true }>
                    <FaEdit className='w-6 h-6 text-blue-500 opacity-70 hover:opacity-100'/>
                </ProductDialog>
                <ConfirmationDialog productId={productData.productData.id} imgUrl={imgUrl} name={name} price={price} subcategory={subcategory} dateString={dateString}/>
            </div>
        </span>
    )
}

export default ProductCatalogItem
