import React, { Suspense } from "react";
import "./App.css";
import Users from "./pages/Users";
// import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import UserDetail from "./pages/UserDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext"; 
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import CartRedux from "./pages/CartRedux";
import Footer from "./components/Footer";
// import NavbarRedux from "./components/NavbarRedux";


// const LazyProductPage = React.lazy(() => import("./pages/Products"));
const LazyProductPage = React.lazy(() => import("./pages/ProductRedux"));

function App() {
  return (
    <CartProvider>
      {/* {" "} */}
      <div className="container-fluid py-2 px-0 bg-light">
        <Navbar />
        {/* <NavbarRedux/> */}
        <div className="container mt-4 p-4 shadow rounded bg-light">
          <ToastContainer position="top-right" autoClose={3000}/>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/users" element={<Users />}>
              <Route path=":userId" element={<UserDetail />} />
            </Route>

            <Route
              path="/products"
              element={
                <Suspense
                  fallback={
                    <div className="text-center my-5">
                      <h1 className="text-secondary fs-4">
                        Loading Product Details...
                      </h1>
                    </div>
                  }
                >
                  <LazyProductPage />
                </Suspense>
              }
            />
            
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/cart" element={<CartRedux />}/>

            <Route
              path="*"
              element={
                  <NotFound/>
              }
            />
          </Routes>
        </div>
        <Footer/>
      </div>
    </CartProvider>
  );
}

export default App;
