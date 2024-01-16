import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Checkout from "./Pages/checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Shop />
                <Footer />
              </>
            }
          />
          <Route
            path="/mens"
            element={
              <>
                <ShopCategory banner={men_banner} category="men" />
                <Footer />
              </>
            }
          />
          <Route
            path="/womens"
            element={
              <>
                <ShopCategory banner={women_banner} category="women" />
                <Footer />
              </>
            }
          />
          <Route
            path="/kids"
            element={
              <>
                <ShopCategory banner={kids_banner} category="kid" />
                <Footer />
              </>
            }
          />
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
