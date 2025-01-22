import React, { useContext } from 'react'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import ProductDialog from './ProductDialog';
import { FaEdit } from "react-icons/fa";
import { NewItemContext } from './NewItemContext';

const ProductCatalogItem = (productData) => {
    const { setCategory, setSubcategory, setImage, setName, setPrice } = useContext(NewItemContext)
    
    const product = {
        imgUrl: productData.productData.images[0],
        name: productData.productData.name,
        price: unitToDollarString(productData.productData.prices[0].priceData.unit_amount),
        subcategory: productData.productData.stripe_metadata_itemSubcategory,
        category: productData.productData.stripe_metadata_itemCategory,
    }

    const dateCreated = productData.productData.date_created
    const date = new Date(dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();

    const IDs = {
        productId: productData.productData.id,
        priceId: productData.productData.prices[0].priceId
    }

    const handleEditClick = () => {
        setCategory(product.category)
        setSubcategory(product.subcategory)
        setImage(product.imgUrl)
        setName(product.name)
        setPrice(product.price)
    }

    return (
        <span className='flex bg-dark-brown bg-opacity-10 rounded-xl overflow-hidden'>
            <div className='flex justify-between items-center text-dark-brown font-header h-16 pr-12 w-11/12'>
                <img 
                    src={ product.imgUrl } 
                    className='aspect-square object-cover h-16 w-16' 
                />
                
                <p className='text-center w-48'>{ product.name }</p>
                <p className='text-center w-24'>{ dateString }</p>
                <p className='text-center w-24'>{ product.subcategory }</p>
                <p className='text-center w-24'>{ product.price }</p>   
            </div>

            <div className='flex space-x-4 items-center'>
                <ProductDialog isEditing={ true } IDs = { IDs }>
                    <FaEdit className='w-6 h-6 text-blue-500 opacity-70 hover:opacity-100' onClick={ handleEditClick }/>
                </ProductDialog>
                <ConfirmDeleteDialog productId={productData.productData.id} productName={ product.name }/>
            </div>
        </span>
    )
}

export default ProductCatalogItem
