import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Scroolcart.scss";
import ProductSevier from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SwipeToSlide() {
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
  const Navigate = useNavigate();
  const handoleChitietsanpham1 = (id) => {
    Navigate(`/product/${id}`);
    window.scroll(0, 0);
  };

  const { data } = ProductSevier("new", 1);

  const [time, setTime] = useState({
    hours: 24,
    minutes: 47,
    seconds: 34,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      let { hours, minutes, seconds } = time;

      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        clearInterval(countdown);
        alert("Flash sale ended!");
      }

      setTime({ hours, minutes, seconds });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdown);
  }, [time]);

  return (
    <div className="products-container">
      <div className="products-list">
        <div class="flash-sale-container">
          <span class="flash-sale">
            FLASH <span class="icon">⚡</span> SALE
          </span>
          <div class="countdown">
            <div class="time-box">
              <span id="hours">{String(time.hours).padStart(2, "0")}</span>
            </div>
            <div class="time-box">
              <span id="hours">{String(time.minutes).padStart(2, "0")}</span>
            </div>
            <div class="time-box">
              <span id="hours">{String(time.seconds).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {data &&
            data.map((item) => (
              <div className="product" key={item.id}>
                <div className="image-product">
                  <img src={item.url_img} alt="" />
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
  );
}

export default SwipeToSlide;
