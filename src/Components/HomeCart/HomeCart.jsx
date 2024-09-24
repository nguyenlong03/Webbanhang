import "./HomeCart.scss";
import { TiShoppingCart } from "react-icons/ti";
import ProductSevier from "../../services/ProductSevier";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";

function HomeCart() {
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleChitietsanpham = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const { data } = ProductSevier("new", 1);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container-cart">
      <div className="list-cart">
        {currentItems.map((item, index) => (
          <div className="card" key={index}>
            <div className="image-container">
              <img src={item.url_img} alt="" />
            </div>
            <p className="price">{item.price}đ</p>
            <div className="content">
              <h3 className="brand">ADIDAS</h3>
              <p className="product-name">{item.name}</p>
            </div>
            <div className="rating">
              <svg
                viewBox="0 0 99.498 16.286"
                xmlns="http://www.w3.org/2000/svg"
                className="svg four-star-svg"
              >
                <path
                  fill="#fc0"
                  transform="translate(-0.001 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  id="star-svgrepo-com"
                ></path>
              </svg>
              (29,062)
            </div>

            <div className="button-container">
              <button
                className="buy-button button"
                onClick={() => handleChitietsanpham(item.id)}
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
        pageRangeDisplayed={5}
        pageCount={pageCount}
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
