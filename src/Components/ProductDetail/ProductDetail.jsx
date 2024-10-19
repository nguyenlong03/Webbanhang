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
  const { data: products } = ProductService("sale", 1);
  const productDetails = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const product =
    products.products.find((item) => item.id === parseInt(id)) ||
    productDetails;

  useEffect(() => {
    if (productDetails) {
      if (
        Array.isArray(productDetails.images) &&
        productDetails.images.length > 0
      ) {
        setSelectedImage(productDetails.images[0].url_image);
      } else if (productDetails.images) {
        setSelectedImage(productDetails.images);
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
      const related = products.products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [products.products, productDetails, product]);

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
      if (response && response.errCode === 0) {
        toast.success("Thêm vào giỏ hàng thành công!", {
          autoClose: 1000,
        });
        navigate("/shoppingcart");
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Update Redux store with the cart items
    try {
      const responseshopcart = await AddcartAPI.Getcart();
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
      console.log("Error:", error);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scroll(0, 0);
  };

  const handlePayment = () => {
    if (product) {
      navigate(`/payment`, {
        state: { product, quantity, selectedSize: size },
      });
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
            {Array.isArray(productDetails.images) ? (
              productDetails.images.map(
                (item, index) => (
                  console.log("check ảnh", item.url_image),
                  (
                    <div className="toggle-item" key={index}>
                      <button
                        className={`toggle-img ${
                          selectedImage === item.url_image ? "selected" : ""
                        }`}
                        onClick={() => handleSelectedImage(item.url_image)}
                      >
                        <img src={item.url_image} alt="" className="img-item" />
                      </button>
                    </div>
                  )
                )
              )
            ) : (
              <img src={productDetails.images} alt="ảnh" className="img-item" />
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
              <p className="product-name">
                {product.name}{" "}
                {product.discount && product.discount > 0 ? (
                  <div className="product-discount">
                    <span>Ưu đãi</span>
                    <span> -{product.discount}%</span>
                  </div>
                ) : (
                  ""
                )}
              </p>
              <div className="price-con">
                <p
                  className="price"
                  style={
                    product.discount > 0
                      ? { textDecoration: "line-through", opacity: 0.3 }
                      : { textDecoration: "none", opacity: 1 }
                  }
                >
                  {product.price}
                  <span>₫</span>
                </p>

                {product.discount > 0 && (
                  <p className="price-new">
                    {product.discounted_price}
                    <span>₫</span>
                  </p>
                )}
              </div>
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
              relatedProducts.map((item, index) => (
                <div className="product" key={index}>
                  <div className="image-product">
                    {item.discount > 0 && (
                      <div className="product-discount">
                        <span>-{item.discount}%</span>
                      </div>
                    )}
                    <img src={item.images} alt={item.name} />
                  </div>
                  <p
                    className="price"
                    style={
                      item.discount > 0
                        ? { textDecoration: "line-through", opacity: 0.3 }
                        : { textDecoration: "none", opacity: 1 }
                    }
                  >
                    {item.price}
                    <span>₫</span>
                  </p>

                  {item.discount > 0 && (
                    <p className="price-new">
                      {item.discounted_price}
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
