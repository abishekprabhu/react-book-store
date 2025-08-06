import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const BASE_URL = "http://localhost:8080/products";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // const fetchProducts = async() => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/${id}`);
  //     setProduct(response.data)
  //   }catch(error){
  //     console.error("Error Fetching product: "+ error);
  //   }
  // }

  useEffect(() =>  {
    // fetchProducts();
    axios
      .get(`${BASE_URL}/${id}`)
      // .get(BASE_URL+`/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="row">
      <div className="col-md-5">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{ maxHeight: "500px", objectFit: "contain" }}
        />
      </div>
      <div className="col-md-7">
        <h3>{product.title}</h3>
        <p className="text-muted">{product.category}</p>
        <h4 className="text-success">${product.price}</h4>
        <p>{product.description}</p>
        <p>
          <strong>Rating:</strong> {product.rating.rate} ★ (
          {product.rating.count} reviews)
        </p>
        <button className="btn btn-success mt-2" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
