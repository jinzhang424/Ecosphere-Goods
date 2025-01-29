import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { setProfileImage } from '../../utilityFunctions/userInfoHandling';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const RoundedImageInput = () => {
    const [image, setImage] = useState('')
    const user = useSelector(selectUser)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        console.log('FILE: ', file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    setImage(reader.result)
                    await setProfileImage(user.uid, imageUrl)
                } catch (error) {
                    console.error(error.message)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={`w-full h-full rounded-full cursor-pointer ${ image === '' ? 'opacity-90 hover:opacity-100' : '' } rounded-full overflow-hidden`} onClick={() => document.getElementById('image-input').click()}>
            <input 
                type="file" 
                accept='image/*'
                id='image-input' 
                className='hidden'
                onChange={ handleImageChange }
            />

            { image === '' ? (
                <CgProfile className='w-full h-full'/>
            ) : (
                <img src={image} className='w-full h-full object-cover object-center' />
            )}
        </div>
    )
}

export default RoundedImageInput
