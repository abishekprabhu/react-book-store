// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../context/CartContext";

// const BASE_URL = "http://localhost:8080/products";
// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();

//   // const fetchProducts = async() => {
//   //   try {
//   //     const response = await axios.get(`${BASE_URL}/${id}`);
//   //     setProduct(response.data)
//   //   }catch(error){
//   //     console.error("Error Fetching product: "+ error);
//   //   }
//   // }

//   useEffect(() =>  {
//     // fetchProducts();
//     axios
//       .get(`${BASE_URL}/${id}`)
//       // .get(BASE_URL+`/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Error loading product:", err));
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="row">
//       <div className="col-md-5">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="img-fluid"
//           style={{ maxHeight: "500px", objectFit: "contain" }}
//         />
//       </div>
//       <div className="col-md-7">
//         <h3>{product.title}</h3>
//         <p className="text-muted">{product.category}</p>
//         <h4 className="text-success">${product.price}</h4>
//         <p>{product.description}</p>
//         <p>
//           <strong>Rating:</strong> {product.rating.rate} ★ (
//           {product.rating.count} reviews)
//         </p>
//         <button className="btn btn-success mt-2" onClick={addToCart}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { useCart } from "../context/CartContext";
import { addToCart } from "../redux/actions/cartAction";
import { toast, ToastContainer } from "react-toastify";
import { Rating } from 'react-simple-star-rating';

const BASE_URL = "http://localhost:8080/products";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();

  //   const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    } else {
      toast.error("Product is out of stock");
    }
  };

//   const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   return (
//     <>
//       {Array(fullStars).fill("★").map((star, i) => (
//         <span key={`full-${i}`} style={{ color: "#ffc107" }}>{star}</span>
//       ))}
//       {halfStar && <span style={{ color: "#ffc107" }}>☆</span>}
//       {Array(emptyStars).fill("☆").map((star, i) => (
//         <span key={`empty-${i}`} style={{ color: "#ccc" }}>{star}</span>
//       ))}
//     </>
//   );
// };


  if (!product) return <p>Loading...</p>;

  const descriptionPreview = product.description?.slice(0, 150);

  return (
    <div className="row justify-content-center py-3">
      <div className="col-md-5">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{ maxHeight: "500px", objectFit: "contain" }}
        />
      </div>
      <div className="col-md-4">
        <h3>{product.title}</h3>
        <p className="text-muted">{product.category}</p>
        <h4 className="text-success">₹{product.price}</h4>

        <p>
          {showFullDescription ? product.description : `${descriptionPreview}...`}
          {product.description?.length > 150 && (
            <button
              className="btn btn-link p-0 ms-2"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button> 
          )}
        </p>
         {/* <p>
          <strong>Rating:</strong> {product.rating?.rate} 
       {renderStars(product.rating?.rate)} 
        </p>
        <p>
          (
          {product.rating?.count} reviews)
        </p> */}
<p>
  <strong>Rating:</strong>{" "}
  <Rating
    readonly
    initialValue={product.rating?.rate || 0}
    size={25}
    allowFraction
  />{" "}
  
</p>
<p>
  ({product.rating?.count} reviews)
</p>



        <button
          className="btn btn-success mt-2"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default ProductDetail;

