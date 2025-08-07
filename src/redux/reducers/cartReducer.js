import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../actions/actionTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      const exists = state.cartItems.find((item) => item.id === product.id);

      if (exists) {
        if (exists.quantity < product.stock) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return state;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }
    }

case REMOVE_FROM_CART: {
  const item = state.cartItems.find((i) => i.id === action.payload);
  if (!item) return state;

  return {
    ...state,
    cartItems: state.cartItems.filter((i) => i.id !== action.payload),
  };
}


    case UPDATE_CART_QUANTITY: {
      const { id, change } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        ),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
