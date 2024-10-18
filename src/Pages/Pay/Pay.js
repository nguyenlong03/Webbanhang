import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getProvinces,
  getDistricts,
  getWards,
} from "../../services/AddressAPI";
import "./pay.scss";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state } = useLocation();
  const {
    product,
    quantity: initialQuantity,
    selectedSize: initialSize,
  } = state || {};
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [selectedSize, setSelectedSize] = useState(initialSize || "");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
      console.log("tinh", data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        const data = await getDistricts(selectedProvince);
        console.log("huyen", data);
        setDistricts(data);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        const data = await getWards(selectedDistrict);
        console.log("xa", data);
        setWards(data);
        setSelectedWard("");
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleProvinceChange = (e) => {
    const province = provinces.find((p) => p.province_name === e.target.value);
    if (province) {
      setSelectedProvince(province.province_id);
    }
  };

  const handleDistrictChange = (e) => {
    const district = districts.find((d) => d.district_name === e.target.value);
    if (district) {
      setSelectedDistrict(district.district_id);
    }
  };

  const handleWardChange = (e) => {
    const ward = wards.find((w) => w.ward_name === e.target.value);
    if (ward) {
      setSelectedWard(ward.ward_id);
    }
  };
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
                <input
                  list="provinces"
                  placeholder="Tỉnh/Thành Phố"
                  onChange={handleProvinceChange}
                />
                <datalist id="provinces">
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_name}
                    />
                  ))}
                </datalist>
              </div>

              <div className="address">
                <input
                  list="districts"
                  placeholder="Quận/Huyện"
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                />
                <datalist id="districts">
                  {districts.map((district) => (
                    <option
                      key={district.district_id}
                      value={district.district_name}
                    />
                  ))}
                </datalist>
              </div>

              <div className="address">
                <input
                  list="wards"
                  placeholder="Phường/Xã/TT"
                  onChange={handleWardChange}
                  disabled={!selectedDistrict}
                />
                <datalist id="wards" className="dropdown">
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_name} />
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
            <img src={product?.url_image} alt={product?.name} />
          </div>
          <div className="info">
            <p className="name-pro">
              <span>
                {product?.name} (Size: {selectedSize})
              </span>
            </p>
            <p className="price">
              {(product?.price * quantity).toLocaleString("vi-VN")}₫
            </p>
            <div className="quantity">
              <button className="btn-quantity" onClick={handleDecreaseQuantity}>
                -
              </button>
              <input
                id="quantity"
                type="text"
                min={1}
                value={quantity}
                readOnly
              />
              <button className="btn-quantity" onClick={handleIncreaseQuantity}>
                +
              </button>
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
