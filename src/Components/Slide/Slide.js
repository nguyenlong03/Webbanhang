import React from "react";
import "./Side.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const SimpleSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slide-container">
      <Slider {...settings}>
        <div className="slide-item">
          <img
            className="slide"
            src="https://thoitrang02.123web.com.vn/wp-content/uploads/2022/06/salepc_1655525482-1536x544.png"
            alt="anh 1"
          />
        </div>

        <div className="slide-item">
          <img
            className="slide"
            src="https://thoitrang02.123web.com.vn/wp-content/uploads/2022/04/IbPDHBYY-1200x400-1.png"
            alt="anh 2"
          />
        </div>

        <div className="slide-item">
          <img
            className="slide"
            src="https://thoitrang02.123web.com.vn/wp-content/uploads/2022/06/banner-fashion-1536x625.gif"
            alt="anh 3"
          />
        </div>
        <div className="slide-item">
          <img
            className="slide"
            src="https://thoitrang02.123web.com.vn/wp-content/uploads/2022/04/1200x400-1200x400-6.png"
            alt="anh 4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
