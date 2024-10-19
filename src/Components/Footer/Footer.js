import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import "./Footer.scss";
import logobanking from "../../assets/imgs/banklist.jpg";

const Footer = () => {
  return (
    <div className="Footer-contaner">
      <div className="footer-header">
        <div className="footer-text ">
          <p className="text-item1">
            <b>Hỗ trợ khách hàng</b>
          </p>
          <p className="text-item">Thẻ ưu đãi</p>
          <p className="text-item">Trung tâm bảo hành</p>
          <p className="text-item">Thanh toán và giao hàng</p>
        </div>
        <div className="footer-text">
          <p className="text-item1">
            <b>Chính sách Mua hàng và Bảo hành</b>
          </p>
          <p className="text-item">Chính sách bảo mật thông tin</p>
          <p className="text-item">Chính sách vận chuyển</p>
          <p className="text-item">Chính sách bảo hành</p>
          <p className="text-item">Chính sách trả góp</p>
        </div>
        <div className="footer-text">
          <p className="text-item1">
            <b>Thông tin </b>
          </p>
          <p className="text-item">giới thiệu </p>
          <p className="text-item">Thông tin liên hệ</p>
          <p className="text-item">Hỏi đáp</p>
        </div>
        <div className="footer-text">
          <div className="footer-folower">
            <p className="text-item1">
              <b>Theo dõi chúng tôi</b>
            </p>
            <div className="icon">
              <div className="item-icon">
                <FaFacebookF />
                <a>facebook.com</a>
              </div>
              <div className="item-icon">
                <FiInstagram />
                <a>instagram.com</a>
              </div>
              <div className="item-icon">
                <FaPhone />
                <a>0123456789</a>
              </div>
              <div className="item-icon">
                {" "}
                <FaTiktok />
                <a>tiktok.com</a>
              </div>
              <div className="item-icon">
                {" "}
                <FaYoutube />
                <a>youtube.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-banking">
          <b className="text-item1 bank">
            Danh sách các ngân hàng thanh toán online
          </b>
          <div className="img-ft">
            <img src={logobanking} alt="" className="" />
          </div>
        </div>
      </div>
      <b className="text-center">© 2024 - Bản quyền thuộc về 3 ANH EM</b>
    </div>
  );
};

export default Footer;
