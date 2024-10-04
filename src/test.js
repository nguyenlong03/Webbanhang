import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Shoppingcart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>Giá: {item.price}₫</p>
              <p>Số lượng: {item.quantity}</p>
              <button onClick={() => handleRemove(item.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shoppingcart;
