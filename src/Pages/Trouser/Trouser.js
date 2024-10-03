import React from "react";
import "./Help.scss"; // Make sure you style this appropriately based on the image

const Trouser = () => {
  return (
    <>
      <div className="container-help">
        <div className="contact">
          <div className="contact-info">
            <h4>Ý KIẾN CỦA BẠN VỀ SHOP</h4>
            <p>MST: 0314839029</p>
            <p>
              Địa chỉ: Phố Hữu Nghị - Xuân Khanh - Sơn Tây - Hà Nội
            </p>
            <p>Hotline: 0123 567 789</p>
            <p>Email: qwerf@gmail.com</p>
            <p>Liên hệ trực tiếp: 0565 694 707</p>

          </div>

          <div className="form-container">
            <form className="form-help">
              <input type="text" placeholder="Họ và tên" />
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Số điện thoại" />
              <textarea placeholder="Nội dung" rows="5"></textarea>
              <button type="submit">Gửi thông tin</button>
            </form>
          </div>
        </div>
        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502013610299!2d106.67716431528493!3d10.773376992321222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed59862d2eb%3A0x99cfb7fb0c9c95b!2zNDcgLSA0OSBUcsOqbiBRdWFuZyDEkWnhu4d1LCBQaMaw4budbmcgMTQsIFF14bqtbiAzLCBUUC4gSOG7kyBDaMOtbmggTWluaA!5e0!3m2!1svi!2s!4v1696335070024!5m2!1svi!2s"
            width="400"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Trouser;
