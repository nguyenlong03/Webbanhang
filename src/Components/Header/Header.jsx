import React, { useState, useEffect } from "react";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Header = () => {
  // Khởi tạo menu từ localStorage nếu có, nếu không thì mặc định là 'Home'
  const [menu, setMenu] = useState(localStorage.getItem("menu") || "Home");

  // Cập nhật localStorage khi menu thay đổi
  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  return (
    <div className="Header-container">
      <img
        className="img-header"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTtK81Da5Yxc8RBdicC3hJO8CiRkQ4UsezA&s"
        alt=""
      />
      <div className="header-list">
        <ul className="list-navbar">
          <NavLink
            to="/home"
            className={`navbar-item ${menu === "Home" ? "active" : ""}`}
            onClick={() => setMenu("Home")}
          >
            Home
          </NavLink>
          <NavLink
            to="/t-shirt"
            className={`navbar-item ${menu === "T-shirt" ? "active" : ""}`}
            onClick={() => setMenu("T-shirt")}
          >
            T-shirt
          </NavLink>
          <NavLink
            to="/dress"
            className={`navbar-item ${menu === "Dress" ? "active" : ""}`}
            onClick={() => setMenu("Dress")}
          >
            Dress
          </NavLink>
          <NavLink
            to="/poloshirt"
            className={`navbar-item ${menu === "Poloshirt" ? "active" : ""}`}
            onClick={() => setMenu("Poloshirt")}
          >
            Poloshirt
          </NavLink>
          <NavLink
            to="/trouser"
            className={`navbar-item ${menu === "Trouser" ? "active" : ""}`}
            onClick={() => setMenu("Trouser")}
          >
            Trouser
          </NavLink>
          <NavLink
            to="/trousershort"
            className={`navbar-item ${menu === "TrouserShort" ? "active" : ""}`}
            onClick={() => setMenu("TrouserShort")}
          >
            TrouserShort
          </NavLink>
        </ul>
      </div>
      <div className="list-input">
        <input className="input-item" type="text" placeholder="Tìm kiếm ..." />
        <div className="icon">
          <CiSearch />
        </div>
        <MdShoppingCart fontSize={"30px"} />
        <div className="icon1">2</div>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-1">
        <NavLink to="/login" type="button" className="long">
          login
        </NavLink>
        <button type="button" className="btn btn-danger">
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
};

export default Header;
