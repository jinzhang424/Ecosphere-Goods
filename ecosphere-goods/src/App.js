import './App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import UserPortalPage from './pages/UserPortalPage'
import ProductPage from './pages/ProductPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { productLoader } from './pages/ProductPage';

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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
