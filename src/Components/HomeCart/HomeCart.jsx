import "./Content.scss";
import ProductsApi from "../../sevies/Products/Products";
import { useState, useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";
import ProductSevier from "../../sevies/ProductSevier";

function HomeCart() {
  const { data } = ProductSevier("all", 1);
  return (
    <div className="list-cart">
      {data &&
        data.map((item, index) => (
          <div className="card" key={index}>
            <div className="image-container">
              <img src={item.url_img} alt="" />
            </div>
            <p className="price">{item.price.toLocaleString("vi-VN")}</p>
            <div className="content">
              <h3 className="brand">ADIDAS</h3>
              <p className="product-name">{item.title}</p>
            </div>
            <div class="rating">
              <svg
                viewBox="0 0 99.498 16.286"
                xmlns="http://www.w3.org/2000/svg"
                class="svg four-star-svg"
              >
                <path
                  fill="#fc0"
                  transform="translate(-0.001 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  id="star-svgrepo-com"
                ></path>
                <path
                  fill="#fc0"
                  transform="translate(20.607 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  data-name="star-svgrepo-com"
                  id="star-svgrepo-com-2"
                ></path>
                <path
                  fill="#fc0"
                  transform="translate(41.215 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  data-name="star-svgrepo-com"
                  id="star-svgrepo-com-3"
                ></path>
                <path
                  fill="#fc0"
                  transform="translate(61.823 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  data-name="star-svgrepo-com"
                  id="star-svgrepo-com-4"
                ></path>
                <path
                  fill="#e9e9e9"
                  transform="translate(82.431 -1.047)"
                  d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z"
                  data-name="star-svgrepo-com"
                  id="star-svgrepo-com-5"
                ></path>
              </svg>
              (29,062)
            </div>

            <div className="button-container">
              <button className="buy-button button">Buy Now</button>
              <button className="cart-button button">
                <i>
                  <TiShoppingCart />
                </i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default HomeCart;
