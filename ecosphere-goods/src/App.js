import './App.css';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import HomePage from './components/pages/homepage/HomePage'
import ProductsPage from './components/pages/products-page/ProductsPage';
import UserPortalPage from './components/pages/user-portal-page/UserPortalPage'
import ShoppingCartPage from './components/pages/checkout-page/CheckoutPage';
import NotFoundPage from './components/pages/error-pages/NotFoundPage';
import InsufficientPermissionsPage from './components/pages/error-pages/InsufficientPermissionsPage';

// Dashboard
import Orders from './components/pages/dashboard/order/Orders'
import DashBoardHomePage from './components/pages/dashboard/dashboard-home/DashBoardHomePage';
import ProductCatalog from './components/pages/dashboard/product-catalog/ProductCatalog';

// Layouts
import MainLayout from './components/page-layouts/MainLayout';
import DashBoardLayout from './components/page-layouts/DashBoardLayout';

import { auth } from './firebase';

// Redux store
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

// Backend functions
import { fetchDeliveryInfo, fetchProfileImage } from './api/userInfoHandling';
import { fetchRole } from './api/userAuth';


import TruckLoader from './components/animations/TruckLoader';
import PaginationProvider from './components/utility/pagination/PaginationContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: '/insufficient-permissions', element: <InsufficientPermissionsPage/> },
      { path: '*', element: <NotFoundPage/>}
    ],
  },
  {
    path : '/dashboard',
    element: <DashBoardLayout />,
    children: [
      { path: 'home', element: <DashBoardHomePage />},
      { path: 'admin/product-catalog', element: <ProductCatalog />},
      { path: 'orders', element: <PaginationProvider><Orders/></PaginationProvider>},
    ]
  },
  { path: '/user-portal', element: <UserPortalPage /> },
  { path: 'shopping-cart', element: <ShoppingCartPage /> },
]);

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        let role
        let deliveryInfo
        let profileImage

        try {
          role = await fetchRole(userAuth.uid)
          deliveryInfo = await fetchDeliveryInfo(userAuth.uid)
          profileImage = await fetchProfileImage(userAuth.uid)
        } catch (error) {
          console.error('Error fetching UID')
        }

        console.log('userauth', userAuth)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          role: role,
          deliveryInfo: deliveryInfo,
          profile_image: profileImage,
        }))
      } else {
        dispatch(logout())
      }

      setIsLoading(false)
    }, [])

    return unsubscribe
  }, [dispatch])

  console.log('Current user:', user)

  return (
    <div>
      <TruckLoader isLoading={isLoading}/>
      {!isLoading && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
