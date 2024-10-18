import React, { useState } from "react";
import "./cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import AddcartAPI from "../../services/AddcartAPI";
import { toast } from "react-toastify";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.items);
  console.log("cart", cart);

  const dispatch = useDispatch();
  const tang = () => {
    setQuantity((prev) => prev + 1);
  };

  const giam = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await AddcartAPI.Deletecart({ product_id: id });
      console.log("check", response);
      if (response && response.errCode === 0) {
        toast.success("Xóa thành công");
        dispatch(removeFromCart(id));
      } else {
        toast.error("Lỗi respone");
      }
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h1>Giỏ hàng của tôi</h1>

        {cart.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <>
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
                {cart.map(
                  (item, index) => (
                    console.log("item", item.id),
                    (
                      <tr key={index}>
                        <td>
                          <div className="product-info">
                            <img src={item.url_img} alt={item.name} />
                            <div>
                              <p className="product-name">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="quantity">
                            <button className="decrease-btn" onClick={giam}>
                              -
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(
                                  Math.max(1, parseInt(e.target.value))
                                )
                              }
                            />
                            <button className="increase-btn" onClick={tang}>
                              +
                            </button>
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td>${(item.price * quantity).toFixed(2)}</td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemove(item.id)}
                          >
                            <FaRegTrashCan />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>

            <div className="summary">
              <div className="line">
                <span>Subtotal</span>
                <span>$24.59</span>
              </div>
              <div className="line">
                <span>Estimated shipping</span>
                <span>$6.94</span>
              </div>
              <div className="line total">
                <span>Total</span>
                <span>$31.53</span>
              </div>
            </div>

            <div className="actions">
              <button className="continue-shopping">Continue Shopping</button>
              <button className="checkout">Thanh toán</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
