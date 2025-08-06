import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { asset } from "../assets/asset";

const BASE_URL = "http://localhost:8080/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      // .get("https://fakestoreapi.com/products")
      .get(BASE_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="row min-vh-90">
        {currentProducts.map((product) => (
          <div className="col-md-4 mb-4 p-3 " key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top p-3"
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text fw-bold">${product.price}</p>
                <div className="mt-auto card-footer d-flex justify-content-evenly align-items-center">                  
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => addToCart(product)}
                  style={{ height: "30px" }}
                >
                    Add to Cart
                  </button>
                  <NavLink
                    to={`/products/${product.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ height: "30px" }}
                    width={100}
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
    </>
  );
};

export default Products;
