import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { setProfileImage } from '../../../api/userInfoHandling';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { storage } from '../../../firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { login } from '../../../features/userSlice';

const RoundedImageInput = () => {
    const user = useSelector(selectUser)
    const [image, setImage] = useState(user.profile_image)
    const dispatch = useDispatch()

    const handleImageChange = async (event) => {
        const file = event.target.files[0]
        console.log('FILE: ', file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }

        await updateProfileImage()
    }

    const updateProfileImage = async () => {
        try {
            const storageRef = ref(storage, `images/${Date.now()}`);
            await uploadString(storageRef, image, 'data_url');
            const imageUrl = await getDownloadURL(storageRef);

            await setProfileImage(user.uid, imageUrl)

            dispatch(login({
                uid: user.uid,
                email: user.email,
                role: user.role,
                deliveryInfo: user.deliveryInfo,
                profile_image: user.profile_image,
            }))
        } catch (error) {
            console.error(error.message)
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
                <img src={image} className='w-full h-full object-cover object-center' alt=''/>
            )}
        </div>
    )
}

export default RoundedImageInput
