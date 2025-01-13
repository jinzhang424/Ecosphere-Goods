import './App.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import UserPortalPage from './pages/UserPortalPage'
import ProductPage from './pages/ProductPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProfilePage from './pages/ProfilePage'
import { productLoader } from './pages/ProductPage';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

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
  { path: '/user-portal', element: <UserPortalPage /> },
  { path: 'shopping-cart', element: <ShoppingCartPage /> },
  { path: 'profile/:profile', element: <ProfilePage />}
]);

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })

    return unsubscribe
  }, [dispatch])

  console.log('dwadawdw:', user)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
