import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { asset } from "../assets/asset";
import '../styles/Search.css';
import { toast, ToastContainer } from "react-toastify"; 



const BASE_URL = "http://localhost:8080/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="row justify-content-center py-3">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="search-container position-relative">
            <form className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="search-icon feather feather-search">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                className="form-control search-input ps-5"
                type="search"
                aria-label="Search"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary ms-2 rounded-pill hover shadow" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row min-vh-90">
        {filteredProducts.slice(startIndex, startIndex + itemsPerPage).map((product) => (
          <div className="col-md-4 mb-4 p-3" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top p-3"
                style={{ height: "250px", objectFit: "contain" }}
              />
              {product.stock === 0 && (
                <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                  Out of Stock
                </span>
              )}
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text fw-bold">₹{product.price}</p>
                <p className={`fw-semibold ${product.stock === 0 ? "text-danger" : "text-success"}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                </p>
                <div className="mt-auto card-footer d-flex justify-content-evenly align-items-center">
                <button
                className="btn btn-success btn-sm"
                style={{
                    height: "30px",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer"
                }}
                title={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                disabled={product.stock === 0}
                onClick={() => {
                    const cartItem = cartItems.find((item) => item.id === product.id);
                    const currentQuantity = cartItem ? cartItem.quantity : 0;

                    if (product.stock === 0) {
                    toast.error("Product is out of stock");
                    } else if (currentQuantity < product.stock) {
                    dispatch(addToCart(product));
                    toast.success(`${product.title} added to cart!`);
                    } else {
                    toast.error(`Only ${product.stock} item(s) in stock`);
                    }
                }}
                >
                Add to Cart
                </button>

                <NavLink
                to={`/products/${product.id}`}
                className="btn btn-primary btn-sm"
                style={{ height: "30px" }}
                >
                More Info
                </NavLink>
            </div>
            </div>
        </div>
  


          </div>
          
        ))}
      </div>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <img src={asset.backward_icon} alt="Backward" width={20} />
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <img src={asset.forward_icon} alt="Next" width={20} />
        </button>
      </div>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        />
    </>
  );
};

export default Products;
