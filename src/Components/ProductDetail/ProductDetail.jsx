import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}
function ProductDetail() {
  const { id } = useParams();
  const { data } = ProductService("new", 1);
  const data1 = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Navigate = useNavigate();
  console.log("desc", data1.description);
  const product = data.find((item) => item.id === parseInt(id));

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 500,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
      const sizeValues = data1.sizes.map((sizeObj) => sizeObj.size);
      setAvailableSizes(sizeValues);
      setSize(sizeValues[0]);
    }
  }, [data1.sizes]);

  useEffect(() => {
    if (product) {
      const related = data.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [product, data]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };

  const handoleChitietsanpham1 = (id) => {
    Navigate(`/product/${id}`);
    window.scroll(0, 0);
  };

  const handlePayment = () => {
    if (product) {
      Navigate(`/payment`, { state: { product, quantity } }); // Truyền cả đối tượng sản phẩm
    } else {
      console.error("Không có sản phẩm nào để thanh toán.");
    }
  };
  console.log("pro", product);
  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <>
      <div className="productDetail-container">
        <div className="image-container">
          <div className="toggle-list">
            {Array.isArray(data1.url_img) ? (
              data1.url_img.map((item, index) => (
                <div className="toggle-item">
                  <button
                    className={`toggle-img ${
                      selectedImage === item ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleSelectedImage(item)}
                  >
                    <img src={item} alt="" className="img-item" />
                  </button>
                </div>
              ))
            ) : (
              <img src={data1.url_img} alt="ảnh" className="img-item" />
            )}
          </div>
          <div className="img">
            <img src={selectedImage || data1.url_img} alt={product.name} />
          </div>
        </div>
        <div className="detail-container">
          <div className="detail">
            <div className="content">
              <p className="product-name">{product.name}</p>
              <p className="price">
                {product.price.toLocaleString("vi-VN")}
                <span>₫</span>
              </p>
            </div>
            <div className="size-quantity">
              <div className="size">
                <label htmlFor="size">Size:</label>
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    className={`btn-size ${size === s ? "selected" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
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
              <button className="buy" onClick={handlePayment}>
                Buy Now
              </button>
              <button className="add-cart">Add Shopping Cart</button>
            </div>
          </div>
          <div class="container-des">
            <div class="benefits">
              <div class="benefit-item">
                <span class="benefit-icon">🚚</span>
                <span class="benefit-text">
                  Thanh toán khi nhận hàng Được kiểm tra hàng trước
                </span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">🔄</span>
                <span class="benefit-text">
                  Đổi hàng 10 ngày Nhấp để xem chính sách
                </span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">🎁</span>
                <span class="benefit-text">
                  Miễn phí vận chuyển Đơn hàng từ 498k
                </span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">🏷️</span>
                <span class="benefit-text">
                  Mua nhiều giảm sâu Nhấp để xem chi tiết
                </span>
              </div>
            </div>

            <div class="features">
              <h3>Đặc điểm nổi bật</h3>
              {data1.description ? (
                <ul className="feature-list">
                  {data1.description.split("\r\n").map((line, index) => (
                    <li key={index} className="feature-item">
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="feature-list">
                  Không có thông tin mô tả sản phẩm.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="products-container">
        <div className="products-list">
          <div className="title">
            <h2>Sản phẩm liên quan</h2>
          </div>
          <Slider {...settings}>
            {relatedProducts &&
              relatedProducts
                .filter((item) => item.discount > 0)
                .map((item) => (
                  <div className="product" key={item.id}>
                    <div className="image-product">
                      <div className="product-discount">
                        <span>-{item.discount}</span>
                      </div>
                      <img src={item.url_img} alt="" />
                    </div>
                    <p className="price">
                      {item.price.toLocaleString("vi-VN")}
                      <span>₫</span>
                    </p>
                    <p className="price-new">
                      {item.discounted_price.toLocaleString("vi-VN")}
                      <span>₫</span>
                    </p>
                    <div className="content">
                      <p
                        className="product-name"
                        onClick={() => handoleChitietsanpham1(item.id)}
                      >
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
