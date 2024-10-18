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
  const [type, setType] = useState("");
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
  // fillter sản phẩm liên quan
  useEffect(() => {
    if (product && productDetails) {
      const relatedProducts = products.products.filter((item) => {
        const isProductAo = productDetails.name && product.name.includes("Áo");
        const isProductQuan =
          productDetails.name && product.name.includes("Quần");
        const isProductVay =
          productDetails.name && product.name.includes("Váy");

        if (isProductAo && item.name && item.name.includes("Áo")) {
          return true;
        }
        if (isProductQuan && item.name.includes("Quần")) {
          return true;
        }
        if (isProductVay && item.name.includes("Váy")) {
          return true;
        }
        return false;
      });

      setRelatedProducts(relatedProducts);
    }
  }, [product, productDetails, products]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };
  //pha
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  // điều kiện khi thêm vào giỏ hàng
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
      navigate(`/payment`, { state: { product, quantity } });
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
                    <img src={item.url_image} alt={item.name} />
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
