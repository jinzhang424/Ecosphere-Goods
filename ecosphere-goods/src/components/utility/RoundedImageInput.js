import React from 'react'
import { CgProfile } from "react-icons/cg";

const RoundedImageInput = ({ image, setImage }) => {

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
        <div className={`w-full h-full rounded-full cursor-pointer ${ image === undefined ? 'opacity-90 hover:opacity-100' : '' } rounded-full overflow-hidden`} onClick={() => document.getElementById('image-input').click()}>
            <input 
                type="file" 
                accept='image/*'
                id='image-input' 
                className='hidden'
                onChange={ handleImageChange }
            />

            { image === undefined ? (
                <CgProfile className='w-full h-full'/>
            ) : (
                <img src={image} className='w-full h-full object-cover object-center' />
            )}
        </div>
    )
}

export default RoundedImageInput
