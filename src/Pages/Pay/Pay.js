import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./pay.scss";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state } = useLocation();
  const { product, quantity } = state || {};
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  if (!product) {
    return <div>Không có sản phẩm nào được chọn để thanh toán.</div>;
  }
  return (
    <div className="container-payment">
      <div className="content-payment">
        <h2>Thông tin mua hàng</h2>
        <form className="form-payment">
          <div className="info-user">
            <input type="email" placeholder="Email" />
          </div>
          <div className="info-user">
            <input type="text" placeholder="Họ và tên" />
          </div>
          <div className="info-user">
            <input type="tel" placeholder="Số điện thoại" />
          </div>
          <div className="info-user">
            <input type="text" placeholder="Địa chỉ" />
          </div>
          <div className="info-user">
            <textarea placeholder="Ghi chú" rows="3"></textarea>
          </div>
        </form>

        <div className="order">
          <div className="img">
            <img src={product?.url_img} alt={product?.name} />
          </div>
          <div className="info">
            <p className="name-pro">
              <span>{product?.name}</span>
            </p>
            <p className="price">{product?.price.toLocaleString("vi-VN")}₫</p>
            <div className="quantity">
              <button className="btn-quantity">-</button>
              <input id="quantity" type="text" min={1} value={quantity} />
              <button className="btn-quantity">+</button>
            </div>
          </div>
        </div>

        <div className="payment-method">
          <h3>Thanh toán</h3>
          <div className="payment">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              onChange={handlePaymentChange}
            />
            <label htmlFor="cod">Thanh toán khi nhận hàng</label>
          </div>
          <div className="payment">
            <input
              type="radio"
              id="app"
              name="payment"
              value="app"
              onChange={handlePaymentChange}
            />
            <label htmlFor="app">Thanh toán qua App ngân hàng</label>
          </div>
          <div className="payment">
            <input
              type="radio"
              id="vnpay"
              name="payment"
              value="vnpay"
              onChange={handlePaymentChange}
            />
            <label htmlFor="vnpay">Thanh toán qua VNPAY</label>
          </div>
          <div className="payment">
            <input
              type="radio"
              id="momo"
              name="payment"
              value="momo"
              onChange={handlePaymentChange}
            />
            <label htmlFor="momo">Thanh toán qua Momo</label>
          </div>
        </div>

        <div className="warning-message">
          <p>Bạn vui lòng điền đầy đủ thông tin giao hàng</p>
        </div>

        <div className="order-summary">
          <h3>Đơn hàng (1)</h3>
          <div className="order-item">
            <span>1077R PIXY STIX</span>
            <span>200.000₫</span>
          </div>
          <div className="discount-code">Nhập mã giảm giá</div>
          <div className="order-item">
            <span>Tạm tính</span>
            <span>200.000₫</span>
          </div>
          <div className="order-item">
            <span>Phí vận chuyển</span>
            <span>30.000₫</span>
          </div>
          <div className="order-item total">
            <span>Tổng cộng</span>
            <span>230.000₫</span>
          </div>
        </div>

        <button className="btn-pay">ĐẶT HÀNG</button>
      </div>
    </div>
  );
};

export default PaymentForm;
