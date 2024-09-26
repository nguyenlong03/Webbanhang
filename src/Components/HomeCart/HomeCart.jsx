import "./HomeCart.scss";
import { TiShoppingCart } from "react-icons/ti";
import ProductSevier from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";

function HomeCart() {
  const Navigate = useNavigate();
  const handoleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  const { data } = ProductSevier("new", 1);
  return (
    <div className="container-cart">
      <div className="list-cart">
        {data &&
          data.map((item, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={item.url_img} alt="" />
              </div>
              {console.log("check data chi tiết sản phẩm", item.url_img)}
              <p className="price">
                {item.price.toLocaleString("vi-VN")}
                <span>₫</span>
              </p>
              <div className="content">
                <h3 className="brand">ADIDAS</h3>
                <p className="product-name">{item.name}</p>
              </div>

              <div className="button-container">
                <button
                  className="buy-button button"
                  onClick={() => handoleChitietsanpham(item.id)}
                >
                  Buy Now
                </button>
                <button className="cart-button button">
                  <i onClick={() => Navigate("/shoppingcart")}>
                    <TiShoppingCart />
                  </i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomeCart;
