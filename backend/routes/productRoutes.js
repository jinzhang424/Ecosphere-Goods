const express = require('express')
const { fetchProducts, fetchProductByName, addNewProduct, deleteProduct, updateProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/fetch-products', fetchProducts)
router.post('/add-new-product', addNewProduct)
router.get('fetch-product-by-name', fetchProductByName)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)

module.exports = router