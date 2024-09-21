import Slider from "react-slick";
import ProductsApi from '../../sevies/Products/Products';
import { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Scroolcart.scss";


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
    prevArrow: <SamplePrevArrow />
  };

  const [data, setData] = useState([]); 
    useEffect(() => {
      const fetchAPI = async () => {
          const res = await ProductsApi.getALL();
          console.log("Product data:", res.products); 
          if (res && res.products) {
              setData(res.products);
          }
      };
      fetchAPI();
  }, []);

  return (
    <div className="products-container">
        <h1>Sản phẩm mới nhất</h1>
        <div className="products-list">
            <Slider {...settings}>
            {data && data.map((item) => (
            <div className="product" key={item.id}>
                <div className="image-product">
                  <img src={item.url_img} alt=""/>
                </div>
                <p className="price">{item.price}</p>
                <div className="content">
                    <p className="product-name">{item.title}</p>
                </div>
            </div>
            ))}
            </Slider>
        </div>
    </div>
  );
  
}

export default SwipeToSlide;
