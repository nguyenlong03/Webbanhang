import "./HomeCart.scss";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

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

  if (loading)
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
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

          {/* Uncomment if needed */}
          {/* <li
          className={`filter-item ${filter === "Áo sơ mi" ? "active" : ""}`}
          onClick={() => handleFilterChange("Áo sơ mi")}
        >
          Áo sơ mi
        </li> */}

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
            Quần short
          </li>

          {/* Uncomment if needed */}
          {/* <li
          className={`filter-item ${filter === "Phụ kiện" ? "active" : ""}`}
          onClick={() => handleFilterChange("Phụ kiện")}
        >
          Phụ kiện
        </li> */}
        </ul>
      </div>

      <div className="container-cart">
        <div className="list-cart">
          {data.length > 0 ? (
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
                <div className="add">
                  <button className="btn-add">
                    <TiShoppingCart size={20} /> ADD TO CART
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
