const express = require('express')
const { fetchProducts, addNewProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/fetch-products', fetchProducts)
router.post('/add-new-product', addNewProduct)

module.exports = router