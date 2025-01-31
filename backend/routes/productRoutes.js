const express = require('express')
const { fetchProducts, fetchProductById, addNewProduct, deleteProduct, updateProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/fetch-products', fetchProducts)
router.post('/add-new-product', addNewProduct)
router.get('/:productID', fetchProductById)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)

module.exports = router