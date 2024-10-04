import "./HomeCart.scss";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomeCart() {
  // const [menu, setMenu] = useState(localStorage.getItem("menu") || "Toàn bộ");
  const [filter, setFilter] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const Navigate = useNavigate();
  const { data, loading, error } = ProductService(filter, currentPage);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setCurrentPage(1);
  };

  const handoleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="line">
        <hr />
      </div>
      <div className="filter">
        <h1>Hôm nay mua gì</h1>
        <ul className="nav-navbar">
          <li
            className={`filter-item ${filter === "new" ? "active" : ""}`}
            onClick={() => handleFilterChange("new")}
          >
            Toàn bộ
          </li>
          <li
            className={`filter-item ${filter === "ao" ? "active" : ""}`}
            onClick={() => handleFilterChange("ao")}
          >
            Áo phông
          </li>

          <li
            className={`filter-item ${filter === "vay" ? "active" : ""}`}
            onClick={() => handleFilterChange("vay")}
          >
            Chân váy
          </li>
          <li
            className={`filter-item ${filter === "quan" ? "active" : ""}`}
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
              <div
                className="card"
                key={index}
                onClick={() => handoleChitietsanpham(item.id)}
              >
                <div className="image-container">
                  <img src={item.url_img} alt={item.name} />
                </div>
                <p className="price">
                  {item.price.toLocaleString("vi-VN")}
                  <span>₫</span>
                </p>
                <div className="content">
                  <p className="product-name">{item.name}</p>
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
