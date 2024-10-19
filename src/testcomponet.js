import React, { useEffect, useState } from "react";
import "./cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { setCart, removeFromCart } from "../../redux/cartSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import AddcartAPI from "../../services/AddcartAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart))); // Khôi phục giỏ hàng từ localStorage
    }
  }, [dispatch]);

  const handleRemove = async (id) => {
    try {
      const response = await AddcartAPI.Deletecart({ product_id: id });
      if (response && response.errCode === 0) {
        toast.success("Xóa thành công");
        dispatch(removeFromCart(id));

        // Cập nhật localStorage
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        console.log(
          "Lỗi response: " + (response ? response.errCode : "No response")
        );
      }
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h1>Giỏ hàng của tôi</h1>
        {cart.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <img src={item.images.url_image} alt={item.name} />
                      <div>
                        <p className="product-name">{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cart;
