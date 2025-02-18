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
import VerificationPage from './components/pages/verification-page/VerificationPage';

// Dashboard
import DashBoardOrdersPage from './components/pages/dashboard/orders-page/DashBoardOrdersPage'
import DashBoardHomePage from './components/pages/dashboard/homepage/DashBoardHomePage';
import ProductCatalogPage from './components/pages/dashboard/product-catalog-page/ProductCatalogPage';

// Layouts
import MainLayout from './components/page-layouts/MainLayout';
import DashBoardLayout from './components/page-layouts/DashBoardLayout';

import { auth } from './firebase';

// Redux store
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

// Api functions
import { fetchDeliveryInfo, fetchProfileImage } from './api/userInfoHandling';
import { handleSetCustomUserClaims } from './api/userAuth';


import TruckLoader from './components/animations/TruckLoader';
import PaginationProvider from './components/utility/pagination/PaginationContext';
import { updateUserTraffic } from './api/storeDataHandling';

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
      { path: 'admin/product-catalog', element: <ProductCatalogPage />},
      { path: 'orders', element: <PaginationProvider><DashBoardOrdersPage/></PaginationProvider>},
    ]
  },
  { path: '/user-portal', element: <UserPortalPage /> },
  { path: 'shopping-cart', element: <ShoppingCartPage /> },
  { path: 'verification', element: <VerificationPage/>}
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
          deliveryInfo = await fetchDeliveryInfo(userAuth.uid)
          profileImage = await fetchProfileImage(userAuth.uid)
          await handleSetCustomUserClaims(userAuth.uid)

          await auth.currentUser.getIdToken(true); 
          const idTokenResult = await auth.currentUser.getIdTokenResult();
          
          role = idTokenResult.claims.admin ? 'admin' : 'customer';
        } catch (error) {
          console.error(error.message)
        }

        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          deliveryInfo: deliveryInfo,
          role: role,
          profile_image: profileImage,
        }))
      } else {
        dispatch(logout())
      }

      setIsLoading(false)
    }, [])

    return unsubscribe
  }, [dispatch])

  useEffect(() => {
    const incrementUserTraffic = () => {
      try {
        updateUserTraffic()
      } catch (error) {
        console.error(error.message)
      }
    }

    incrementUserTraffic()
  }, [])

  console.log('Current user:', user)

  return (
    <div>
      <TruckLoader isLoading={isLoading}/>
      {!isLoading && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
