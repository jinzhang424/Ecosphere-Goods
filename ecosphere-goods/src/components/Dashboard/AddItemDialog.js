import React, { useContext, useState } from "react";
import DialogButton from "./DialogButton";
import TextField from '@mui/material/TextField';
import SelectCategory from "./SelectCategory";
import SelectSubcategory from "./SelectSubcategory";
import { NewItemContext } from "./NewItemContext";
import ImageInput from "../utility/ImageInput";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

export default function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const { setCategory, subcategory, setSubcategory, image, setImage, name, setName, price, setPrice } = useContext(NewItemContext)
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setCategory('')
    setSubcategory([])
    setImage(null)
    setName('')
    setPrice('')
    setFieldsNotFilled(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      setFieldsNotFilled(true)
      return
    }

    setFieldsNotFilled(false)
    try {
      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadString(storageRef, image, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      console.log('SUBCATEGORY:', subcategory)

      const newProduct = {
        name,
        price,
        image: imageUrl,
        subcategory
      };

      const response = await fetch('https://australia-southeast1-ecosphere-goods.cloudfunctions.net/createStripeProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to create producDADDADA:', errorText);
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      console.log('Product created:', data)
      handleCancel();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div>
        <DialogButton label={ 'Add Item' } onClick={ handleClickOpen } />
        { open && (
          <>
            <div className='fixed inset-0 bg-black bg-opacity-50' onClick={ handleCancel }></div>
            
            <dialog open className='flex flex-col fixed inset-0 z-40 w-7/12 p-10 pr-12 pl-12 bg-off-white rounded-3xl h-fit'>
              <h1 className='font-header text-dark-brown text-sHeader'>Add New Product</h1>
              
              <form onSubmit={ handleSubmit } className='flex flex-col flex-grow justify-between mt-8' noValidate >
                <div className='flex justify-between'>
                  <ImageInput/>
                  
                  <div className='flex-grow pl-10 flex flex-col justify-between space-y-8'>
                    <TextField 
                      required 
                      fullWidth 
                      id="product-name" 
                      label="Product Name" 
                      variant="outlined" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    
                    <TextField 
                      required 
                      fullWidth 
                      id="price" 
                      label="Price" 
                      variant="outlined" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    
                    <div className='flex justify-between mt-8'>
                      <SelectCategory className='w-52'/>
                      <SelectSubcategory className='w-52'/>
                    </div>
                  </div>
                </div>

                <div className='flex w-full justify-between mt-10'>
                  <DialogButton label={ 'Cancel' } onClick={ handleCancel } />
                  <div className='flex items-center justify-center space-x-4'>
                    <p className={`${fieldsNotFilled ? 'text-red-700' : 'hidden'}`}>* Please fill out all fields</p>
                    <div className={`${fieldsNotFilled ? 'animate-shake' : ''}`}><DialogButton label={ 'Add' } type="submit" /></div>
                  </div>
                </div>
              </form>
            </dialog>
          </>
            )
        }
    </div>
  );
}