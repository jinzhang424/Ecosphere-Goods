const express = require('express')
const { fetchProducts } = require('../controllers/productController')

const router = express.Router()

router.get('/getProducts', fetchProducts)

module.exports = router