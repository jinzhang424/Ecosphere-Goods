// This function splits array elements in a range into their own array to paginize them.

// 
export const seperateToPages = (itemsPerPage, items, totalPages) => {
    
    const productsOnPage = []
    for (let i = 0; i < totalPages; i++) {
        productsOnPage.push(items.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
    }

    return productsOnPage
}