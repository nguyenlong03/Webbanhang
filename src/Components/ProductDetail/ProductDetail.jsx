import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSevier from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams();
  const { data } = ProductSevier("new", 1);
  const data1 = ChitietSanPham(parseInt(id));
  const [selectedimage, setSelectedImage] = useState("");
  console.log("check data chi tiết sản phẩm", data1.url_img);
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
          <img src={selectedimage || data1.url_img} alt={product.name} />
        </div>
      </div>
      <div className="detail">
        <div className="content">
          <p className="product-name">{product.name}</p>
          <p className="price">
            {product.price.toLocaleString("VI-VN")}
            <span>₫</span>
          </p>
          <p className="description">{product.description}</p>
        </div>
        <div className="size-quantity">
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
          <div className="quantity">
            <label htmlFor="quantity">Số lượng</label>
            <input id="quantity" type="number" min={1}></input>
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
