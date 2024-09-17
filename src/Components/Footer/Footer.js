import React from "react";

import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer-contaner">
      <div className="footer-header">
        <div className="footer-text ">
          <b className="text-item1">Hỗ trợ khách hàng </b>
          <p className="text-item">Thẻ ưu đãi</p>
          <p className="text-item">Trung tâm bảo hành</p>
          <p className="text-item">Thanh toán và giao hàng</p>
          <p className="text-item">Dịch vụ sửa chữa và ủi</p>
        </div>
        <div className="footer-text">
          <b className="text-item1">Chính sách Mua hàng và Bảo hành</b>
          <p className="text-item">Quy định chung</p>
          <p className="text-item">Chính sách bảo mật thông tin</p>
          <p className="text-item">Chính sách vận chuyển</p>
          <p className="text-item">Chính sách bảo hành</p>
          <p className="text-item">Chính sách đổi trả và hoàn tiền</p>
          <p className="text-item">Chính sách giá cả và hình thức thanh toán</p>
          <p className="text-item">Chính sách trả góp</p>
        </div>
        <div className="footer-text">
          <b className="text-item1">Thông tin 247</b>
          <p className="text-item">giới thiệu 247</p>
          <p className="text-item">Thông tin liên hệ</p>
          <p className="text-item">Hệ thống Showroom</p>
          <p className="text-item">Hỏi đáp</p>
        </div>
        <div className="footer-text">
          <b className="text-item1">Mẫu Website Fashion </b>
          <p className="text-item"> Mẫu Web quần áo</p>
          <p className="text-item">
            {" "}
            Youtube:{" "}
            <a
              href="https://www.youtube.com/ "
              className="text-danger text-decoration-none"
            >
              youtube.com
            </a>
          </p>
          <p className="text-item ">
            Tiktok:{" "}
            <a href="" className=" text-decoration-none text-danger">
              {" "}
              Tiktok.com
            </a>
          </p>
          <p className="text-item">
            Facebook:
            <a href="" className="text-danger text-decoration-none">
              {" "}
              Facebook.com
            </a>
          </p>
        </div>
        <div className="footer-text">
          <b className="text-item1">Email liên hệ</b>
          <p className="text-item">Thẻ ưu đãi</p>
          <p className="text-item">Trung tâm bảo hành</p>
          <p className="text-item">Thanh toán và giao hàng</p>
          <p className="text-item">Dịch vụ sửa chữa và ủi</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-folower">
          <b className="text-item1"> Theo dõi chúng tôi</b>
          <div className="icon">
            <FaFacebookF />
            <FiInstagram />
            <FaPhone />
            <FaTiktok />
            <IoMdMailUnread />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-banking">
          <b className="text-item1">
            Danh sách các ngân hàng thanh toán online
          </b>
          <div className="img-ft">
            <img
              width={"500px"}
              height={"50px"}
              src="https://cafefcdn.com/thumb_w/640/203337114487263232/2021/5/19/photo1621415200386-1621415200585197860103.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <b className="text-center">
        © Bản quyền thuộc về Fashion - 123 Web Thiết kế bởi 123WEB.COM.VN
      </b>
    </div>
  );
};

export default Footer;
