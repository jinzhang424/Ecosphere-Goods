import React, { useContext } from 'react'
import { NewItemContext } from '../Dashboard/NewItemContext'
import { MdCloudUpload } from "react-icons/md";

const ImageInput = () => {
    const { image, setImage } = useContext(NewItemContext)

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

    console.log('IMAGE:', image)

    return (
        <div>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className='hidden'
                onChange={ handleImageChange }
            />
            <div 
                onClick={() => document.getElementById('image').click()}
                className={ `flex flex-col w-full justify-center items-center cursor-pointer p-12 border-dashed border-4 border-dark-brown rounded-3xl aspect-square hover:opacity-100 opacity-80 transition-opacity ease-in-out duration-100 ${ image ? 'border-opacity-0' : ''}` }
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${image})`
                  }}
            >
                {!image && (
                    <>
                        <MdCloudUpload className='w-20 h-20 text-dark-brown'/>
                        <h1 className='text-center font-header'>Upload the Product Image</h1>
                    </>
                )}
            </div> 
        </div>
    )
    }

export default ImageInput
