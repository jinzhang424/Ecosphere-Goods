import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import UserPortalPage from './pages/UserPortalPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
        </Route>
        <Route path="/user-portal" element={<UserPortalPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
