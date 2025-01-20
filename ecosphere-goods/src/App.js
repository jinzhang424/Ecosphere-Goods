import './App.css';
import { useEffect } from 'react';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: ':productName', element: <ProductPage />, loader: productLoader },
    ],
  },
  {
    path : '/dashboard',
    element: <DashBoardLayout />,
    children: [
      { path: 'home', element: <DashBoardHomePage />},
      { path: 'product-catalog', element: <AdminProductCatalog />}
    ]
  },
  { path: '/user-portal', element: <UserPortalPage /> },
  { path: 'shopping-cart', element: <ShoppingCartPage /> },
]);

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        let role

        try {
          role = await fetchRole(userAuth.uid)
        } catch (error) {
          console.error('Error fetching UID')
        }

        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          role: role
        }))
      } else {
        dispatch(logout())
      }
    })

    return unsubscribe
  }, [dispatch])

  console.log('Current user:', user)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
