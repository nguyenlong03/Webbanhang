import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Scroolcart.scss";
import ProductSevier from "../../sevies/ProductSevier";


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

  const {data} = ProductSevier('all', 1); 

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
                <p className="price">{item.price.toLocaleString("Vi-VN")}<span>₫</span></p> 
                <div className="content">
                    <p className="product-name">{item.name}</p>
                </div>
            </div>
            ))}
            </Slider>
        </div>
    </div>
  );
  
}

export default SwipeToSlide;
