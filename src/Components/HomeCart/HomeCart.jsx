import "./HomeCart.scss";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function HomeCart() {
  // const [menu, setMenu] = useState(localStorage.getItem("menu") || "Toàn bộ");
  const [filter, setFilter] = useState("new");
  const [page, setPage] = useState(1);
  const Navigate = useNavigate();
  const { data, loading, error } = ProductService(filter, page);
  const handleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => {
    setPage(1);
  };
  const handleLastPage = () => {
    setPage(3);
  };

  if (loading)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
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
                onClick={() => handleChitietsanpham(item.id)}
              >
                <div className="image-container">
                  {item.discount > 0 && (
                    <div className="product-discount">
                      <span>-{item.discount}%</span>
                    </div>
                  )}
                  <img src={item.images.url_image} alt={item.name} />
                </div>

                <p
                  className="price"
                  style={
                    item.discount > 0
                      ? { textDecoration: "line-through", opacity: 0.3 }
                      : { textDecoration: "none", opacity: 1 }
                  }
                >
                  {item.price.toLocaleString("vi-VN")}
                  <span>₫</span>
                </p>

                {item.discount > 0 && (
                  <p className="price-new">
                    {item.discounted_price.toLocaleString("vi-VN")}
                    <span>₫</span>
                  </p>
                )}

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

      <div className="next-prev-container">
        <div className="next-page">
          <button
            className="ve-dau"
            onClick={handleFirstPage}
            disabled={page === 1}
          >
            Về trang đầu
          </button>
          <button
            className="prev"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <GrFormPrevious />
          </button>
          <span>{` ${page}/3`}</span>
          <button
            className="next"
            onClick={handleNextPage}
            disabled={data.length === 0}
          >
            <GrFormNext />
          </button>
          <button
            className="den-cuoi"
            onClick={handleLastPage}
            disabled={page === 0}
          >
            Đến trang cuối
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeCart;
