import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Scroolcart.scss";
import ProductSevier from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function SwipeToSlide() {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const Navigate = useNavigate();
  const handoleChitietsanpham1 = (id) => {
    Navigate(`/product/${id}`);
    window.scroll(0, 0);
  };

  const { data } = ProductSevier("new", 1);
  return (
    <div className="products-container">
      <h1>Sản phẩm mới nhất</h1>
      <div className="products-list">
        <Slider {...settings}>
          {data &&
            data.map((item) => (
              <div className="product" key={item.id}>
                <div className="image-product">
                  <img src={item.url_img} alt="" />
                </div>
                <p className="price">{item.price}</p>
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
  );
}

export default SwipeToSlide;
