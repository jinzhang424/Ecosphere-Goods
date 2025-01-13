import React from 'react'

const ProductCatalogItem = (productData) => {
    return (
        <div>
            { productData.productData.name }
            { productData.productData.prices[0].priceData.unit_amount }
        </div>
    )
}

export default ProductCatalogItem
