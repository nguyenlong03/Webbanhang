import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSevier from "../../sevies/ProductSevier";
import ChitietSanPham from "../../sevies/chitietsanpham";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams();
  const { data } = ProductSevier("new", 1);
  // console.log("checkdata cure productsevier", data);
  const data1 = ChitietSanPham();
  console.log("check data chi tiết sản phẩm", data1.url_img);
  const product = data.find((item) => item.id === parseInt(id));

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="productDetail-container">
      <div className="image-container">
        <div className="btn-img">
          {Array.isArray(data1.url_img) ? (
            data1.url_img.map((item, index) => (
              <img src={item} alt="" key={index} className="btn-imgitem" />
            ))
          ) : (
            <img src={data1.url_img} alt="" className="btn-imgone" />
          )}
        </div>
        <div className="img">
          <img src={product.url_img} alt={product.name} className="anh" />
        </div>
      </div>
      <div className="detail">
        <div className="content">
          <p className="product-name">{product.name}</p>
          <p className="price">
            {product.price.toLocaleString("VI-VN")}
            <span>₫</span>
          </p>
          <p className="description">Dây là áo dẹp</p>
        </div>
        <div className="size-color">
          <div className="size">
            <label htmlFor="size">Size:</label>
            <select id="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="2XL">2XL</option>
            </select>
          </div>
          <div className="color">
            <label htmlFor="color">Color:</label>
            <select id="color">
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
        </div>
        <div className="btn-detail">
          <button className="buy">Buy Now</button>
          <button className="add-cart">Add Shopping Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
