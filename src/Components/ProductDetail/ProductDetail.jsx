import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams();
  const { data } = ProductService("new", 1);
  console.log("se", data);
  const data1 = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);

  const product = data.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (Array.isArray(data1.url_img) && data1.url_img.length > 0) {
      setSelectedImage(data1.url_img[0]);
    } else if (data1.url_img) {
      setSelectedImage(data1.url_img);
    } else if (product) {
      setSelectedImage(product.url_img);
    }
  }, [data1.url_img, product]);

  useEffect(() => {
    if (Array.isArray(data1.sizes) && data1.sizes.length > 0) {
      setAvailableSizes(data1.sizes);
      setSize(data1.sizes[0]);
    }
  }, [data1.sizes]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="productDetail-container">
      <div className="image-container">
        <div className="toggle">
          {Array.isArray(data1.url_img) ? (
            data1.url_img.map((item, index) => (
              <button
                className="toggle-img"
                key={index}
                onClick={() => handleSelectedImage(item)}
              >
                <img src={item} alt="" className="img-item" />
              </button>
            ))
          ) : (
            <img src={data1.url_img} alt="ảnh" className="img-item" />
          )}
        </div>
        <div className="img">
          <img src={selectedImage || data1.url_img} alt={product.name} />
        </div>
      </div>
      <div className="detail">
        <div className="content">
          <p className="product-name">{product.name}</p>
          <p className="price">
            {product.price.toLocaleString("vi-VN")}
            <span>₫</span>
          </p>
          <p className="description">{product.description}</p>
        </div>
        <div className="size-quantity">
          <div className="size">
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {availableSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="quantity">
            <label htmlFor="quantity">Số lượng</label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
            />
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
