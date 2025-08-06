import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
const handleDecrease = (item) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, -1);
  } else {
    removeFromCart(item.id);
  }
};


const handleIncrease = (item) => {
  updateQuantity(item.id, 1);
};



  // const decreaseQuantity = (item) => {
  //   if (item.quantity > 1) {
  //     // Reduce quantity by 1
  //     const updatedItem = { ...item, quantity: item.quantity - 1 };
  //     removeFromCart(item.id); // Remove current
  //     addToCart(updatedItem);  // Add updated
  //   } else {
  //     removeFromCart(item.id); // Remove if quantity is 1
  //   }
  // };

  return (
    <div className="container">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-info">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "60px", height: "60px", objectFit: "contain" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleDecrease(item)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleIncrease(item)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-end">
            <h4 className="fw-bold">
              Total Cost:{" "}
              <span className="text-success">₹{totalCost.toFixed(2)}</span>
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
