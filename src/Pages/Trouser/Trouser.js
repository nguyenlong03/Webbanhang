import React from "react";
import "./Help.scss"; // Make sure you style this appropriately based on the image
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Trouser = () => {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    if (email && tel && name !== "") {
      toast.success("Gửi thông tin thành công");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };
  return (
    <>
      <div className="container-help">
        <div className="contact">
          <div className="contact-info">
            <h4>Ý KIẾN CỦA BẠN VỀ SHOP</h4>
            <p>MST: 0314839029</p>
            <p>Địa chỉ: Phố Hữu Nghị - Xuân Khanh - Sơn Tây - Hà Nội</p>
            <p>Hotline: 1900 1588</p>
            <p>Email: nguyenlong682003@gmail.com</p>
            <p>Liên hệ trực tiếp: 0973064395</p>
          </div>

          <div className="form-container">
            <form className="form-help">
              <input
                type="text"
                placeholder="Họ và tên"
                required=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Số điện thoại"
                required=""
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />

              <textarea placeholder="Nội dung" rows="5"></textarea>
              <button type="submit" onClick={handlesubmit}>
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.0326365442093!2d105.4416153737999!3d21.111264984942515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345f3390d8a149%3A0x372b9b5e16ee7935!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBWaeG7h3QgLSBIdW5n!5e0!3m2!1svi!2s!4v1729172545039!5m2!1svi!2s"
            width="400"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Trouser;
