
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Layout from "./components/Layout";
import LoginPage from './pages/LoginPage';
import CreateShopPage from './pages/CreateShopPage';
import Dashboard from './pages/Dashboard';
import AddProductPage from './pages/AddProductPage';
import PreviewPage from './pages/PreviewPage';
import ViewShopPage from './pages/ViewShopPage';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { getCurrentUser } from './redux/slices/authSlice';
import EditShopPage from './pages/EditShopPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Homepage /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/create" element={<Layout><CreateShopPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/shop/:shopLink/add-product" element={<Layout><AddProductPage /></Layout>} />
        <Route path="/shop/:shopLink/preview" element={<Layout><PreviewPage /></Layout>} />
        <Route path="/shop/:shopLink" element={<ViewShopPage />}/>
        <Route path="/edit-shop/:id" element={<Layout><EditShopPage /></Layout>} />


      </Routes>
    </Router>
  );
}

export default App;
