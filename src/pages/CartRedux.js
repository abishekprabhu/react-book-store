import React from "react";
import { removeFromCart, updateCartQuantity } from "../redux/actions/cartAction";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const CartRedux = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartQuantity(item.id, -1));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleIncrease = (item) => {
    if (item.quantity < item.stock) {
      dispatch(updateCartQuantity(item.id, 1));
      toast.success("Item added");
    } else {
      toast.error(`Only ${item.stock} item(s) in stock`);
    }
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
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
                  <td><img src={item.image} alt={item.title} width="60" /></td>
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
                        disabled={item.quantity >= item.stock}
                        title={item.quantity >= item.stock ? "Stock limit reached" : ""}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <small className="text-muted">In Stock: {item.stock}</small>
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end mt-3 bg-dark text-secondary">
            <h4>TOTAL COST : <strong className="text-light"> ₹{totalCost.toFixed(2)}</strong></h4>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default CartRedux;
