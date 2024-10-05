import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import "./ProductDetail.scss";
import AddcartAPI from "../../services/AddcartAPI";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: products } = ProductService("new", 1);
  const productDetails = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Navigate = useNavigate();

  const product =
    products.find((item) => item.id === parseInt(id)) || productDetails;

  useEffect(() => {
    if (productDetails) {
      if (
        Array.isArray(productDetails.url_img) &&
        productDetails.url_img.length > 0
      ) {
        setSelectedImage(productDetails.url_img[0]);
      } else if (productDetails.url_img) {
        setSelectedImage(productDetails.url_img);
      }
    }
  }, [productDetails]);

  useEffect(() => {
    if (productDetails && Array.isArray(productDetails.sizes)) {
      const sizes = productDetails.sizes.map((sizeObj) => sizeObj.size);
      setAvailableSizes(sizes);
      setSize(sizes[0]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (product && productDetails) {
      const related = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [products, productDetails, product]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const product = products.find((item) => item.id === parseInt(id));
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
        Navigate("/shoppingcart");
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      console.error("lọt vào catch:", error);
    }
    // data shopcart
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

  const handleProductClick = (id) => {
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

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  // Slider settings
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

  return (
    <>
      <div className="productDetail-container">
        <div className="image-container">
          <div className="toggle-list">
            {Array.isArray(productDetails.url_img) ? (
              productDetails.url_img.map((item, index) => (
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
              <img
                src={productDetails.url_img}
                alt="ảnh"
                className="img-item"
              />
            )}
          </div>
          <div className="img">
            <img
              src={selectedImage || productDetails.url_img}
              alt={product.name}
            />
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
                <button className="btn-quantity" onClick={decrementQuantity}>
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
                <button className="btn-quantity" onClick={incrementQuantity}>
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
            <div className="benefits">{/* Add your benefits content */}</div>
            <div className="features">
              <h3>Đặc điểm nổi bật</h3>
              {productDetails.description ? (
                <ul className="feature-list">
                  {productDetails.description
                    .split("\r\n")
                    .map((line, index) => (
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
              relatedProducts.map((item) => (
                <div className="product" key={item.id}>
                  <div className="image-product">
                    {item.discount > 0 && (
                      <div className="product-discount">
                        <span>-{item.discount}%</span>
                      </div>
                    )}
                    <img src={item.url_img} alt={item.name} />
                  </div>
                  <p
                    className="price"
                    style={
                      item.discount > 0
                        ? { textDecoration: "line-through", opacity: 0.3 }
                        : { textDecoration: "none", opacity: 1 }
                    }
                  >
                    {item.price.toLocaleString("vi-VN")}
                    <span>₫</span>
                  </p>

                  {item.discount > 0 && (
                    <p className="price-new">
                      {item.discounted_price.toLocaleString("vi-VN")}
                      <span>₫</span>
                    </p>
                  )}
                  <div className="content">
                    <p
                      className="product-name"
                      onClick={() => handleProductClick(item.id)}
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
