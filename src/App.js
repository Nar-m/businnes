
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Layout from './components/Header/Layout';
import 'aos/dist/aos.css';
import ModalLocation from './components/ModalLocation/ModalLocation';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import ProductDetalis from './components/ProductDetalis/ProductDetalis';
import Category from './components/Category/Category';
import ModalWishlist from './components/ModalWishlist/ModalWishlist';
import Wishlist from './components/Wishlist/Wishlist';
import ProductModal from './components/ProductModal/ProductModal';
import Foods from './components/Food/Food';
import Clothes from './components/Clothes/Clothes';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Verification from './components/Verification/Verification';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import Admin from './components/AdminPanel/AdminPanel';
import SuccesLogin from './components/Succeslogin/Succeslogin';
import ProgressWidth from './components/Progresswidth/ProgressWidth';
import CheckOut from './components/checkout/Checkout';
import VerifyEmail from './components/Verify/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ModalLocation />
      <ModalWishlist />
      <Category />
      <ProgressWidth/>
      <ProductModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='food' element={<Foods />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='clothes' element={<Clothes />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='verification' element={<Verification />} />
        <Route path='succes' element={<SuccesLogin />} />
        <Route path='updatePassword' element={<UpdatePassword />} />
        <Route path='checkout' element={<CheckOut/>}/>
        <Route path='/productdetalis/:id' element={<ProductDetalis />} />
        <Route path='/verify/:randoms' element={<VerifyEmail/>}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
