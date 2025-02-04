import './App.css';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import UserPortalPage from './pages/UserPortalPage'
import ProductPage from './pages/ProductPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { productLoader } from './pages/ProductPage';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import DashBoardLayout from './layouts/DashBoardLayout';
import DashBoardHomePage from './pages/DashBoardHomePage';
import AdminProductCatalog from './components/Dashboard/AdminProductCatalog';
import { fetchRole } from './utilityFunctions/userAuth';
import InsufficientPermissionsPage from './pages/InsufficientPermissionsPage';
import Orders from './components/Dashboard/Order/Orders';
import LowLevelOrderView from './components/Dashboard/Order/LowLevelOrderView';
import { orderLoader } from './components/Dashboard/Order/LowLevelOrderView';
import { fetchDeliveryInfo, fetchProfileImage } from './utilityFunctions/userInfoHandling';
import TruckLoader from './components/animations/TruckLoader';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductPage />, loader: productLoader },
      { path: '/insufficient-permissions', element: <InsufficientPermissionsPage/> },
      { path: '*', element: <NotFoundPage/>}
    ],
  },
  {
    path : '/dashboard',
    element: <DashBoardLayout />,
    children: [
      { path: 'home', element: <DashBoardHomePage />},
      { path: 'admin/product-catalog', element: <AdminProductCatalog />},
      { path: 'orders', element: <Orders/>},
      { path: 'orders/:userID/:orderID', element: <LowLevelOrderView/>, loader: orderLoader }
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
