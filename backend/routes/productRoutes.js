const express = require('express')
const { fetchProducts, addNewProduct, deleteProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/fetch-products', fetchProducts)
router.post('/add-new-product', addNewProduct)

router.delete('/delete-product', deleteProduct)

module.exports = router