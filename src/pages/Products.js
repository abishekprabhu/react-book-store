import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-3 mb-4" key={product.id}>
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
              <div className="mt-auto d-flex justify-content-between">
                <button className="btn btn-success btn-sm" onClick={addToCart}>
                  Add to Cart
                </button>
                <NavLink
                  to={`/products/${product.id}`}
                  className="btn btn-primary btn-sm"
                >
                  More Info
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
