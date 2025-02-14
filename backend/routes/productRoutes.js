const express = require('express')
const { fetchProducts, fetchProductById, addNewProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/fetch-products', fetchProducts)
router.get('/:productID', fetchProductById)

router.post('/add-new-product', checkUserVerification, addNewProduct)
router.delete('/delete-product', checkUserVerification, deleteProduct)
router.put('/update-product', checkUserVerification, updateProduct)

module.exports = router