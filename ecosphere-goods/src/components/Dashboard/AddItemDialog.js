import React, { useContext, useState } from "react";
import DialogButton from "./DialogButton";
import TextField from '@mui/material/TextField';
import SelectCategory from "./SelectCategory";
import SelectSubcategory from "./SelectSubcategory";
import { NewItemContext } from "./NewItemContext";
import ImageInput from "../utility/ImageInput";

export default function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const { category, setCategory } = useContext(NewItemContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    handleClose();
  };

  console.log(open)

  return (
    <div>
        <DialogButton label={ 'Add Item' } onClick={ handleClickOpen } />
        { open && (
          <>
            <div className='fixed inset-0 bg-black bg-opacity-50' onClick={ handleClose }></div>
            
            <dialog open className='fixed inset-0 z-40 w-5/12 p-10 pr-12 pl-12 bg-off-white rounded-3xl m-auto h-5/6'>
              <h1 className='font-header text-dark-brown text-sHeader'>Add New Product</h1>
              
              <form onSubmit={ handleSubmit }>
                <ImageInput/>
                
                <TextField id="product-name" label="Product Name" variant="outlined" />
                <TextField id="price" label="Price" variant="outlined" />
                
                <SelectCategory/>
                <SelectSubcategory/>

                <div className='flex w-full justify-between'>
                  <DialogButton label={ 'Cancel' } onClick={ handleClose } />
                  <DialogButton label={ 'Add' } type="submit" />
                </div>
              </form>
            </dialog>
          </>
            )
        }
    </div>
  );
}