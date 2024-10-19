import React, { useEffect } from "react";
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
      dispatch(setCart(JSON.parse(storedCart))); // Gọi action để set lại giỏ hàng trong Redux
    }
  }, [dispatch]);

  const tang = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));
  };

  const giam = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));
  };

  const handleRemove = async (id) => {
    try {
      const response = await AddcartAPI.Deletecart({ product_id: id });
      if (response && response.errCode === 0) {
        toast.success("Xóa thành công");
        dispatch(removeFromCart(id));
        // cập nhật localstorage
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        toast.error(response.errMessage || "Lỗi không xác định");
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

  const handolereturnhome = () => {
    navigate("/");
  };

  const handolenexttopayment = () => {
    navigate("/payment", {
      state: { cart },
    });
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
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="product-info">
                        <img src={item.images.url_image} alt={item.name} />
                        <div>
                          <p className="product-name">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="quantity">
                        <button
                          className="decrease-btn"
                          onClick={() => giam(item.id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <button
                          className="increase-btn"
                          onClick={() => tang(item.id)}
                        >
                          +
                        </button>
                      </div>
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

            <div className="summary">
              <div className="line">
                <span>Subtotal</span>
                <span>
                  $
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="line">
                <span>Estimated shipping</span>
                <span>$6.94</span>
              </div>
              <div className="line total">
                <span>Total</span>
                <span>
                  $
                  {(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) + 6.94
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="actions">
              <button className="continue-shopping" onClick={handolereturnhome}>
                Continue Shopping
              </button>
              <button className="checkout" onClick={handolenexttopayment}>
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
