import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductSevier";
import ChitietSanPham from "../../services/chitietsanpham";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

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
  const { data } = ProductService("new", 1);
  const data1 = ChitietSanPham(parseInt(id));
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Navigate = useNavigate();
  console.log("check data 1 ", data1.sizes);
  console.log("check data product", data);
  const product = data.find((item) => item.id === parseInt(id)) || data1;

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

  useEffect(() => {
    if (data1) {
      if (Array.isArray(data1.url_img) && data1.url_img.length > 0) {
        setSelectedImage(data1.url_img[0]);
      } else if (data1.url_img) {
        setSelectedImage(data1.url_img);
      }
    }
  }, [data1, product]);

  useEffect(() => {
    if (Array.isArray(data1.sizes) && data1.sizes.length > 0) {
      setAvailableSizes(data1.sizes);
      setSize(data1.sizes);
    }
  }, [data1.sizes]);

  useEffect(() => {
    if (product && data1) {
      const related = data.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [data, data1, product]);

  const handleSelectedImage = (img) => {
    setSelectedImage(img);
  };
  //add redux
  const handleAddBuyNow = () => {
    const productToAdd = product || data1;
    dispatch(
      addToCart({
        ...productToAdd,
        quantity,
        price: product.price * quantity,
      })
    );
    toast.success("Đã thêm vào giỏ hàng");
  };

  const handoleChitietsanpham1 = (id) => {
    Navigate(`/product/${id}`);
    window.scroll(0, 0);
  };
  console.log("pro", product);
  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <>
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
              {product.price}
              <span>₫</span>
            </p>
            <p className="product-desc">{data1.description}</p>
          </div>
          <div className="size-quantity">
            <div className="size">
              <label htmlFor="size">Size:</label>
              {availableSizes.map((s, index) => {
                return (
                  <button
                    key={index}
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
            <button className="add-cart" onClick={handleAddBuyNow}>
              Add Shopping Cart
            </button>
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
                    <img src={item.url_img} alt={item.name} />
                  </div>
                  <p className="price">
                    {item.price.toLocaleString("vi-VN")}
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
