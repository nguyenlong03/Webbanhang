import React from "react";
import "./cart.scss";
import { useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  
  const tang = () => {
    setQuantity((prev) => prev + 1);
  };
  const giam = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return <>
    <div className="cart-container">
      <div class="cart">
        <h1>Giỏ hàng của tôi</h1>
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
            <tr>
              <td>
                <div class="product-info">
                  <img src="product-image.png" alt="Product"/>
                  <div>
                    <p class="product-name">Product name</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="quantity">
                  <button class="decrease-btn" onClick={giam}>-</button>
                  <input 
                  type="number"  
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }/>
                  <button class="increase-btn" onClick={tang}>+</button>
                </div>
              </td>
              <td>$4.87</td>
              <td>$14.61</td>
              <td><button class="remove-btn"><FaRegTrashCan /></button></td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <div class="line">
            <span>Subtotal</span>
            <span>$24.59</span>
          </div>
            <div class="line">
            <span>Estimated shipping</span>
            <span>$6.94</span>
          </div>
          <div class="line total">
            <span>Total</span>
            <span>$31.53</span>
          </div>
        </div>

        <div class="actions">
          <button class="continue-shopping">Continue Shopping</button>
          <button class="checkout">Thanh toán</button>
        </div>
      </div>
    </div>
  </>
};

export default Cart;
