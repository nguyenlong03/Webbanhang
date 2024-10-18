import "./HomeCart.scss";
import ProductService from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function HomeCart() {
  // const [menu, setMenu] = useState(localStorage.getItem("menu") || "Toàn bộ");
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const Navigate = useNavigate();
  const { data, loading, error } = ProductService(filter, page);
  const data1 = data.products;
  console.log("check data produc 22", data1);

  console.log("check data produc 11", data.totalPages);

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
    if (page === data.totalPages) {
      setPage(data.totalPages);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => {
    setPage(1);
  };
  const handleLastPage = () => {
    setPage(data.totalPages);
  };

  if (loading)
    return (
      <div className="spinner-border text-primary d- " role="status">
        <span className="sr-only"></span>
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
            onClick={() => handleFilterChange("all")}
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
          ) : data1.length > 0 ? (
            data1.map((item, index) => (
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
                  <img src={item.url_image} alt={item.name} />
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
          <span>{` ${page}/${data.totalPages}`}</span>
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
