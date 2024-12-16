import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminPanel from "./pages/admin/AdminPanel";
import Profile from "./pages/Profile";
import AllProducts from "./pages/AllProducts";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentOptions from "./pages/PaymentOptions";
import CardPayment from "./pages/CardPayment";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/admin/AddProduct"
import ProductsList from "./pages/admin/ProductsList";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditProduct from "./pages/admin/EditProduct";
import Dynamic from "./pages/Dynamic";

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element = {<ResetPassword />}/>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-panel" element = {<AdminPanel />}/>
        <Route path="/profile" element = {<Profile />}/>
        <Route path="/all-products" element = {<AllProducts />}/>
        <Route path="/edit-profile" element = {<EditProfile />}/>
        <Route path="/cart" element = {<Cart />}/>
        <Route path="/checkout" element = {<Checkout />}/>
        <Route path="/payment-options" element = {<PaymentOptions />}/>
        <Route path="/card-payment" element = {<CardPayment />}/>
        <Route path="/product/:id" element = {<ProductDetail />}/>
        <Route path="/add-product" element = {<AddProduct />}/>
        <Route path="/products-list" element = {<ProductsList />}/>
        <Route path="/dashboard" element = {<AdminDashboard />}/>
        <Route path="/edit-a-product/:id" element = {<EditProduct />}/>
        <Route path="/:category" element = {<Dynamic />}/>
      </Routes>
    </div>
  );
};

export default App;
