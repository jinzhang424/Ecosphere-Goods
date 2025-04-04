import React, { useContext } from 'react'
import { ProductCatalogContext } from '../../pages/dashboard/product-catalog-page/ProductCatalogContext'
import { MdCloudUpload } from "react-icons/md";

const ImageInput = () => {
    const { image, setImage } = useContext(ProductCatalogContext)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        console.log('FILE: ', file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <div 
                onClick={() => document.getElementById('image').click()}
                className={ `flex flex-col w-full justify-center items-center cursor-pointer p-12 border-dashed border-4 border-dark-brown rounded-3xl aspect-square hover:opacity-100 opacity-80 transition-opacity ease-in-out duration-100 ${ image ? 'border-opacity-0' : ''}` }
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${image})`
                }}
            >
                <div className={`${!image ? '' : 'opacity-0'} flex flex-col justify-center items-center`}>
                    <MdCloudUpload className='w-20 h-20 text-dark-brown'/>
                    <h1 className='text-center font-header'>Upload the Product Image</h1>
                </div>
            </div>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className='opacity-0 absolute bottom-28 left-28'
                onChange={ handleImageChange }
                required
            /> 
        </div>
    )
}

export default ImageInput
