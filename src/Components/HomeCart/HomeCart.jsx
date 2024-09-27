import "./HomeCart.scss";
import { TiShoppingCart } from "react-icons/ti";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomeCart() {
  const [filter, setFilter] = useState("new");
  const Navigate = useNavigate();
  const { data, loading, error } = ProductService(filter, 1);

  const handoleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="filter">
        <h1>Hôm nay mua gì</h1>
        <ul className="nav-navbar">
          <li className="filter-item" onClick={() => handleFilterChange("all")}>
            Toàn bộ
          </li>
          <li className="filter-item" onClick={() => handleFilterChange("ao")}>
            Áo phông
          </li>
          <li className="filter-item" onClick={() => handleFilterChange("vay")}>
            Chân váy
          </li>
          <li
            className="filter-item"
            onClick={() => handleFilterChange("quan")}
          >
            Quần
          </li>
        </ul>
      </div>

      <div className="container-cart">
        <div className="list-cart">
          {loading ? (
            <div className="load-container">
              <div class="spinner-border text-info" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <div className="card" key={index}>
                <div className="image-container">
                  <img src={item.url_img} alt={item.name} />
                </div>
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
            ))
          ) : (
            <p>Không có sản phẩm nào được tìm thấy.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeCart;
