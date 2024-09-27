import "./HomeCart.scss";
import { TiShoppingCart } from "react-icons/ti";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomeCart() {
  const Navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ao");
  const { data } = ProductService(selectedCategory);
  console.log("dulieutheoType", data);

  const handoleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Xóa dữ liệu trong sessionStorage để buộc tải lại dữ liệu mới
    sessionStorage.removeItem("productsData");
  };
  return (
    <div className="container-cart">
      <div className="filter">
        <h1>Hôm nay mua gì</h1>
        <nav className="nav-navbar">
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("all")}
          >
            Toàn bộ
          </button>
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("ao")}
          >
            Áo phông
          </button>
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("quan")}
          >
            Áo sơ mi
          </button>
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("vay")}
          >
            Chân váy
          </button>
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("all")}
          >
            Quần short
          </button>
          <button
            className="filter-item"
            onClick={() => handleCategoryClick("all")}
          >
            Phụ kiện
          </button>
        </nav>
      </div>
      <div className="list-cart">
        {data &&
          data.map((item, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={item.url_img} alt="" />
              </div>
              <p className="price">{item.price}đ</p>
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
                  <i>
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
