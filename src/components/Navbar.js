import React from "react";
import { asset } from "../assets/asset";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css"; // Include the CSS from below
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 px-4 nav-container rounded shadow">
      <NavLink
        className="navbar-brand d-flex align-items-center gap-2 brand-hover"
        to="/"
      >
        <img
          src={asset.book_icon}
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <strong className="fs-4 text-dark">E-Book Store</strong>
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav gap-4 align-items-center">
          {/* HOME */}
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-link-hover d-flex flex-row align-items-center gap-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={asset.home_icon} alt="Home" width="20" />
              <span>HOME</span>
            </NavLink>
          </li>

          {/* USERS */}
          <li className="nav-item">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-link nav-link-hover d-flex flex-row align-items-center gap-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={asset.users_icon} alt="Users" width="24" />
              <span>USERS</span>
            </NavLink>
          </li>

          {/* PRODUCTS */}
          <li className="nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link nav-link-hover d-flex flex-row align-items-center gap-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src={asset.product_icon} alt="Products" width="20" />
              <span>PRODUCTS</span>
            </NavLink>
          </li>

          {/* CART */}
          <li className="nav-item position-relative">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link nav-link-hover d-flex flex-row align-items-center gap-2 position-relative ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div>
                <img src={asset.cart_icon} alt="Cart" width="18" />
                <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                  {cartCount > 0 ? cartCount : "0"}
                </span>
              </div>
              <span>CART</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
