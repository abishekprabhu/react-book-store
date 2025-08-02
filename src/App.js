import React, { Suspense } from "react";
import "./App.css";
import Users from "./pages/Users";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import UserDetail from "./pages/UserDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"; // If separate detail page exists
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider

// Lazy load Products page
const LazyProductPage = React.lazy(() => import("./pages/Products"));

function App() {
  return (
    <CartProvider>
      {" "}
      {/* ✅ Wrap your App in CartProvider */}
      <div className="container-fluid py-2 px-0">
        <Navbar />
        <div className="container mt-4 p-4">
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

            {/* ✅ Product Detail Route */}
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* ✅ Cart Route */}
            <Route path="/cart" element={<Cart />} />

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <div className="text-center mt-5">
                  <h1 className="text-danger">Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
