import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Header from './Layouts/Header.jsx';
import Footer from './Layouts/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import Category from './Pages/Category/Category.jsx';
import Users from './Pages/Admin/User/Users.jsx';
import Instruments from './Pages/Admin/Instruments/Instruments.jsx';
import ProductDetails from './Pages/Category/ProductDetails/ProductDetails.jsx';
import Car from './Pages/Car/Car.jsx';
import ProductBrand from './Pages/ProductBrand/ProductBrand.jsx';
import ContactUs from './Pages/Contact/Contact.jsx';
import AboutUs from './Pages/About/AboutUs.jsx';
import News from './Pages/News/News.jsx';
import PaymentMethod from './Pages/Payment/PaymentMethod/PaymentMethod.jsx';
import Catalog from './Pages/Category/Catalog.jsx';
import Brands from './Pages/Admin/Brands/Brands.jsx';
import Subcategories from './Pages/Admin/Subcategories/Subcategories.jsx';
import PasswordResetFlow from './Pages/ResetPassword/PasswordResetFlow';
import OrderConfirmation from './Pages/Payment/OrderConfirmation.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import AuthSuccess from './Pages/Login/AuthSuccess.jsx';
import AuthError from './Pages/Login/AuthError.jsx';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, user } = useAuth(); 

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user?.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:categoryId/:instrumentId" element={<ProductDetails />} />
            <Route path="/product/:brand" element={<ProductBrand />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/news" element={<News />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/car" element={<Car />} />
            <Route path="/reset-password" element={<PasswordResetFlow />} />
            <Route path="/login/success" element={<AuthSuccess />} />
            <Route path="/login/error" element={<AuthError />} />

            {/* Rutas protegidas */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <PaymentMethod />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />


            {/* Rutas solo para admin */}
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly={true}>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/admin/instruments" element={
              <ProtectedRoute adminOnly={true}>
                <Instruments />
              </ProtectedRoute>
            } />
            <Route path="/admin/brands" element={
              <ProtectedRoute adminOnly={true}>
                <Brands />
              </ProtectedRoute>
            } />
            <Route path="/admin/subcategories" element={
              <ProtectedRoute adminOnly={true}>
                <Subcategories />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;