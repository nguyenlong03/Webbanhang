import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.scss";
import AddcartAPI from "../../services/AddcartAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

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
  const { data: products } = ProductService("all", 1);
  const productDetails = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product =
    products.find((item) => item.id === parseInt(id)) || productDetails;

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 500,
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

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng.");
      return;
    }

    try {
      const response = await AddcartAPI.Addtocart({
        product_id: product.id,
        size,
        quantity,
      });
      console.log("check resssss", response);
      if (response && response.errCode === 0) {
        toast.success("Thêm vào giỏ hàng thành công!", {
          autoClose: 1000,
        });
        navigate("/shoppingcart");
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      console.error("lọt vào catch:", error);
    }

    // Update Redux store with the cart items
    try {
      const responseshopcart = await AddcartAPI.Getcart();
      console.log("check res cart shop", responseshopcart.items);
      const ress = responseshopcart.items;
      ress.forEach((item) => {
        const productToAdd = item.product;
        const size = item.size;
        const quantity = item.quantity;
        const price = item.product.price;
        if (productToAdd) {
          dispatch(
            addToCart({
              ...productToAdd,
              size: size,
              quantity: quantity,
              price: price,
            })
          );
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(product.url_img) && product.url_img.length > 0) {
      setSelectedImage(product.url_img[0]);
    } else if (product.url_img) {
      setSelectedImage(product.url_img);
    }
  }, [product]);

  useEffect(() => {
    if (productDetails && Array.isArray(productDetails.sizes)) {
      const sizes = productDetails.sizes.map((sizeObj) => sizeObj.size);
      setAvailableSizes(sizes);
      setSize(sizes[0]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (product) {
      const related = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [product, products]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };

  const handleChitietsanpham1 = (id) => {
    navigate(`/product/${id}`);
    window.scroll(0, 0);
  };

  const handlePayment = () => {
    navigate(`/payment`, { state: product.id });
  };

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <>
      <div className="productDetail-container">
        <div className="image-container">
          <div className="toggle-list">
            {Array.isArray(product.url_img) ? (
              product.url_img.map((item, index) => (
                <div className="toggle-item" key={index}>
                  <button
                    className={`toggle-img ${
                      selectedImage === item ? "selected" : ""
                    }`}
                    onClick={() => handleSelectedImage(item)}
                  >
                    <img src={item} alt="" className="img-item" />
                  </button>
                </div>
              ))
            ) : (
              <img src={product.url_img} alt="ảnh" className="img-item" />
            )}
          </div>
          <div className="img">
            <img src={selectedImage || product.url_img} alt={product.name} />
          </div>
        </div>
        <div className="detail-container">
          <div className="detail">
            <div className="content">
              <p className="product-name">{product.name}</p>
              <p className="price">
                {product.price}
                <span>₫</span>
              </p>
            </div>
            <div className="size-quantity">
              <div className="size">
                <label htmlFor="size">Size:</label>
                {availableSizes.map((s, index) => (
                  <button
                    key={index}
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
              <button className="add-cart" onClick={handleAddToCart}>
                Add Shopping Cart
              </button>
            </div>
          </div>
          <div className="container-des">
            <div className="benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <span className="benefit-text">
                  Thanh toán khi nhận hàng Được kiểm tra hàng trước
                </span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔄</span>
                <span className="benefit-text">
                  Đổi hàng 10 ngày Nhấp để xem chính sách
                </span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <span className="benefit-text">
                  Miễn phí vận chuyển Đơn hàng từ 498k
                </span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏷️</span>
                <span className="benefit-text">
                  Mua nhiều giảm sâu Nhấp để xem chi tiết
                </span>
              </div>
            </div>

            <div className="features">
              <h3>Đặc điểm nổi bật</h3>
              {product.description ? (
                <ul className="feature-list">
                  {product.description.split("\r\n").map((line, index) => (
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
                        onClick={() => handleChitietsanpham1(item.id)}
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
