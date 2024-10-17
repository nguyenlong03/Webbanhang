import { useState } from "react";
import { useLocation } from "react-router-dom";
import GetAddress from "../../services/GetAddress";
import "./pay.scss";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state } = useLocation();
  const { product, quantity } = state || {};

  // Sử dụng hook để lấy danh sách địa chỉ
  const {
    provinces,
    districts,
    wards,
    setSelectedProvince,
    setSelectedDistrict,
  } = GetAddress();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

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
            <div className="address-list">
              <div className="address">
                {/* Input chọn Tỉnh/Thành Phố */}
                <input
                  list="provinces"
                  id="province"
                  placeholder="Tỉnh/Thành Phố"
                  onChange={(e) => setSelectedProvince(e.target.value)}
                />
                <datalist id="provinces">
                  {provinces.map((province, index) => (
                    <option key={index} value={province.province_name} />
                  ))}
                </datalist>
              </div>

              <div className="address">
                {/* Input chọn Quận/Huyện */}
                <input
                  list="districts"
                  id="district"
                  placeholder="Quận/Huyện"
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!districts.length} // Vô hiệu hoá nếu chưa chọn tỉnh
                />
                <datalist id="districts">
                  {districts.map((district, index) => (
                    <option key={index} value={district.district_name} />
                  ))}
                </datalist>
              </div>

              <div className="address">
                {/* Input chọn Phường/Xã */}
                <input
                  list="wards"
                  id="ward"
                  placeholder="Phường/Xã/TT"
                  disabled={!wards.length}
                />
                <datalist id="wards">
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.ward_name} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="info-user">
            <input type="text" placeholder="Địa chỉ chi tiết" />
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
              <input
                id="quantity"
                type="text"
                min={1}
                value={quantity}
                readOnly
              />
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

        <div className="order-summary">
          <h3>Đơn hàng (1)</h3>
          <div className="order-item">
            <span>{product?.name}</span>
            <span>{(product?.price * quantity).toLocaleString("vi-VN")}₫</span>
          </div>
          <div className="order-item">
            <span>Tạm tính</span>
            <span>{(product?.price * quantity).toLocaleString("vi-VN")}₫</span>
          </div>
          <div className="order-item">
            <span>Phí vận chuyển</span>
            <span>30.000₫</span>
          </div>
          <div className="order-item total">
            <span>Tổng cộng</span>
            <span>
              {(product?.price * quantity + 30000).toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <button className="btn-pay">ĐẶT HÀNG</button>
      </div>
    </div>
  );
};

export default PaymentForm;
