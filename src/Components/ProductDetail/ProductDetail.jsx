import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams();
  const { data } = ProductService("new", 1);
  const data1 = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);

  const product = data.find((item) => item.id === parseInt(id));

  const tang = () => {
    setQuantity((prev) => prev + 1);
  };
  const giam = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

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
                className={`toggle-img ${
                  selectedImage === item ? "selected" : ""
                }`}
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
          <p className="desc">{product?.description}</p>
        </div>
        <div className="size-quantity">
          <div className="size">
            <label htmlFor="size">Size:</label>
            {availableSizes.map((s) => {
              return (
                <button
                  key={s}
                  className={`btn-size ${size === s ? "selected" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="quantity">
            <label htmlFor="quantity">Số lượng: </label>
            <button className="btn-quantity" onClick={giam}>
              -
            </button>
            <input
              id="quantity"
              type="text"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
            />
            <button className="btn-quantity" onClick={tang}>
              +
            </button>
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
