import "./HomeCart.scss";
import { TiShoppingCart } from "react-icons/ti";
import ProductSevier from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

function HomeCart() {
  const Navigate = useNavigate();
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const handoleChitietsanpham = (id) => {
    Navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  const { data, totalPage } = ProductSevier("new", currentPage + 1);
  console.log("checkdata", data);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
  };

  return (
    <div className="container-cart">
      <div className="list-cart">
        {data &&
          data.map((item, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={item.url_img} alt="" />
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
                  <i>
                    <TiShoppingCart />
                  </i>
                </button>
              </div>
            </div>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={totalPage}
        previousLabel="< previous"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-item"
        nextLinkClassName="page-item"
        breakClassName="page-item"
        activeClassName="active"
      />
    </div>
  );
}

export default HomeCart;
