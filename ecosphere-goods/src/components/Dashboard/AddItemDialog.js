import React, { useContext, useState } from "react";
import DialogButton from "./DialogButton";
import TextField from '@mui/material/TextField';
import SelectCategory from "./SelectCategory";
import SelectSubcategory from "./SelectSubcategory";
import { NewItemContext } from "./NewItemContext";
import ImageInput from "../utility/ImageInput";

export default function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const { category, setCategory, subcategory, setSubcategory, image, setImage, name, setName, price, setPrice } = useContext(NewItemContext)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      setFieldsNotFilled(true)
      return
    }

    handleCancel();
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
                    <TextField required fullWidth id="product-name" label="Product Name" variant="outlined" />
                    <TextField required fullWidth id="price" label="Price" variant="outlined" />
                    
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