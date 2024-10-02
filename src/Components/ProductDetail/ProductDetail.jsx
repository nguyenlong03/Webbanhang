import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import "./ProductDetail.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

function ProductDetail() {
  const dispatch = useDispatch();
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
    if (data1) {
      if (Array.isArray(data1.url_img) && data1.url_img.length > 0) {
        setSelectedImage(data1.url_img[0]);
      } else if (data1.url_img) {
        setSelectedImage(data1.url_img);
      }

      if (Array.isArray(data1.sizes) && data1.sizes.length > 0) {
        setAvailableSizes(data1.sizes);
        setSize(data1.sizes[0]);
      }
    } else if (product) {
      if (Array.isArray(product.url_img) && product.url_img.length > 0) {
        setSelectedImage(product.url_img[0]);
      } else if (product.url_img) {
        setSelectedImage(product.url_img);
      }

      if (Array.isArray(product.sizes) && product.sizes.length > 0) {
        setAvailableSizes(product.sizes);
        setSize(product.sizes[0]);
      }
    }
  }, [data1, product]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };
  const handleBuyNow = () => {
    const productToAdd = product || data1;
    dispatch(
      addToCart({
        ...productToAdd,
        quantity,
      })
    );
  };

  if (!product && !data1) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="productDetail-container">
      <div className="image-container">
        <div className="toggle">
          {Array.isArray(data1?.url_img) ? (
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
            <img
              src={data1?.url_img || product?.url_img}
              alt="ảnh"
              className="img-item"
            />
          )}
        </div>
        <div className="img">
          <img
            src={selectedImage || product?.url_img}
            alt={product?.name || "Product"}
          />
        </div>
      </div>
      <div className="detail">
        <div className="content">
          <p className="product-name">{product?.name || data1?.name}</p>
          <p className="price">
            {product?.price || data1?.price}
            <span>₫</span>
          </p>
        </div>
        <div className="size-quantity">
          <div className="size">
            <label htmlFor="size">Size:</label>
            {availableSizes.map((item, index) => (
              <button
                key={index}
                className={`btn-size ${size === item ? "selected" : ""}`}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="quantity">
            <label htmlFor="quantity">Số lượng: </label>
            <button className="btn-quantity" onClick={giam}>
              -
            </button>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
            <button className="btn-quantity" onClick={tang}>
              +
            </button>
          </div>
        </div>
        <div className="btn-detail">
          <button className="buy" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="add-cart">Add Shopping Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
