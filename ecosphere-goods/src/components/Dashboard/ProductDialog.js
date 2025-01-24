import React, { useContext, useState } from "react";
import DialogButton from "./DialogButton";
import TextField from '@mui/material/TextField';
import SelectCategory from "./SelectCategory";
import SelectSubcategory from "./SelectSubcategory";
import { NewItemContext } from "./NewItemContext";
import ImageInput from "../utility/ImageInput";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { addNewProduct, updateProduct } from "../../utilityFunctions/productHandling";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function ProductDialog({ children, isEditing = false, IDs }) {
  const [open, setOpen] = useState(false);
  const { category, setCategory, subcategory, setSubcategory, image, setImage, name, setName, price, setPrice } = useContext(NewItemContext)
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false)
  const user = useSelector(selectUser)

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

  const isAllFieldsFilled = () => {
    return category && image && name && price && subcategory
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAllFieldsFilled()) {
      setFieldsNotFilled(true)
      return
    }

    setFieldsNotFilled(false)
    if (isEditing) {
      await handleUpdateProduct()
    } else {
      await handleAddProduct()
    }
    
    handleCancel()
  };

  const handleAddProduct = async () => {
    try {
      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadString(storageRef, image, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      await addNewProduct(name, price, subcategory, imageUrl, category, user.uid)
      toast.success('Successfully added new product.')
    } catch (error) {
      console.error(error.message);
      toast.error('Error adding new product.')
    }
  }

  const handleUpdateProduct = async () => {
    try {
      const product = {
        name: name,
        imgUrl: image,
        price: price,
        category: category,
        subcategory: subcategory
      }

      await updateProduct(product, IDs, user.uid)
      toast.success('Successfully updated product.')
    } catch (error) {
      console.error(error.message)
      toast.error('Error updating product.')
    }
  }

  return (
    <div>
        <button onClick={ handleClickOpen } type="submit" className='flex items-center'>
          { children }
        </button>
        { open && (
          <>
            <div className='fixed inset-0 bg-black bg-opacity-50' onClick={ handleCancel }></div>
            
            <dialog open className='flex flex-col fixed inset-0 z-40 w-7/12 p-10 pr-12 pl-12 bg-off-white rounded-3xl h-fit'>
              <h1 className='font-header text-dark-brown text-sHeader'>{isEditing ? 'Update Product' : 'Add New Product'}</h1>
              
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
                    <div className={`${fieldsNotFilled ? 'animate-shake' : ''}`}><DialogButton label={ isEditing ? 'Update' : 'Add' } type="submit" /></div>
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