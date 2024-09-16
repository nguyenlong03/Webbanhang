import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

import "./Footer.scss";

const Footer = () => {
  return <div className="Footer-contaner">

    <div className="footer-header">
      <div className="footer-text ">
        <b className="text-item">Hỗ trợ khách hàng </b>
        <p className="text-item">Thẻ ưu đãi</p>
        <p className="text-item">Trung tâm bảo hành</p>
        <p className="text-item">Thanh toán và giao hàng</p>
        <p className="text-item">Dịch vụ sửa chữa và ủi</p>
      </div>
      <div className="footer-text" >
      <b className="text-item">Hỗ trợ khách hàng </b>
        <p className="text-item">Thẻ ưu đãi</p>
        <p className="text-item">Trung tâm bảo hành</p>
        <p className="text-item">Thanh toán và giao hàng</p>
        <p className="text-item">Dịch vụ sửa chữa và ủi</p>
      </div>
      <div className="footer-text">
      <b className="text-item">Hỗ trợ khách hàng </b>
        <p className="text-item">Thẻ ưu đãi</p>
        <p className="text-item">Trung tâm bảo hành</p>
        <p className="text-item">Thanh toán và giao hàng</p>
        <p className="text-item">Dịch vụ sửa chữa và ủi</p>
      </div>
      <div className="footer-text">
      <b className="text-item">Hỗ trợ khách hàng </b>
        <p className="text-item">Thẻ ưu đãi</p>
        <p className="text-item">Trung tâm bảo hành</p>
        <p className="text-item">Thanh toán và giao hàng</p>
        <p className="text-item">Dịch vụ sửa chữa và ủi</p>
      </div>
      <div className="footer-text">
      <b className="text-item">Hỗ trợ khách hàng </b>
        <p className="text-item">Thẻ ưu đãi</p>
        <p className="text-item">Trung tâm bảo hành</p>
        <p className="text-item">Thanh toán và giao hàng</p>
        <p className="text-item">Dịch vụ sửa chữa và ủi</p>
      </div>
    </div>

    <div className="footer-bottom">
       <div className="footer-folower">
          <b> Theo dõi chunsg tôi</b>
          <div className="icon">
             <FaFacebookF/>
             <FiInstagram/>
             <FaPhone/>
             <FaTiktok/>
             <IoMdMailUnread/>
             <FaYoutube/>


          </div>
       </div>
       <div className="footer-banking">
             <b>Danh sách các ngân hàng thanh toán online</b>
             <div>
             <img width={'500px'} height={'50px'} src="https://cafefcdn.com/thumb_w/640/203337114487263232/2021/5/19/photo1621415200386-1621415200585197860103.png" alt="" />
             </div>

       </div>

    </div>
    <b className="text-center">© Bản quyền thuộc về Fashion - 123 Web Thiết kế bởi 123WEB.COM.VN</b>
  </div>;
};

export default Footer;
