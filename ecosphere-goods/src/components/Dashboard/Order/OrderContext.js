import React, { createContext, useState } from 'react';

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([])

    return (
        <OrderContext.Provider
            value={{
                orders, setOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }