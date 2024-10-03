import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Seach from "../../services/Seach/Seach";
import Notification from "../../Pages/Notify/Notify";
import { TRUE } from "sass";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [menu, setMenu] = useState(localStorage.getItem("menu") || "Home");
  const [recort, setRecort] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(true);
  const debounceTimeout = useRef(null);

  // chức năng logout
  const handleLogout = () => {
    if (token) {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn đăng xuất không?"
      );
      if (confirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("avatar");
        setUserName(null);
        setAvatar(null);
        toast.success("Logout thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.success("Logout bị hủy!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Bạn chưa đăng nhập!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // xét menu
  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  // click img logo
  const handleHonelogo = () => {
    setMenu("Home");
    navigate("/");
  };

  // filter input với debounce
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setShowSearchBox(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchData(value);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function fetch data
  const fetchData = async (keyword) => {
    if (!keyword) {
      setRecort([]); // Nếu không có từ khóa, đặt lại danh sách kết quả
      setNoDataFound(false); // Không có dữ liệu tìm kiếm
      return;
    }

    try {
      const response = await Seach.getALL(keyword); // Gọi API với từ khóa
      console.log("data", response.products);
      if (response.products.length > 0) {
        setRecort(response.products);
        setNoDataFound(false);
        setNoDataFound(false);
      } else {
        setRecort([]);
        setNoDataFound(true);
        setNoDataFound(true);
      }
    } catch (error) {
      console.log("error", error);
      setRecort([]);
      setNoDataFound(true);
      setNoDataFound(true);
    }
  };
  const handoleshowhide = () => {
    setShowSearchBox(false);
  };
  const handoleshowio = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="Header-container">
      <img
        className="img-header"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTtK81Da5Yxc8RBdicC3hJO8CiRkQ4UsezA&s"
        alt=""
        onClick={handleHonelogo}
      />
      <div className="header-list">
        <ul className="list-navbar">
          <NavLink
            to="/"
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
            Hot Sale
          </NavLink>
          <NavLink
            to="/dress"
            className={`navbar-item ${menu === "Dress" ? "active" : ""}`}
            onClick={() => setMenu("Dress")}
          >
            Products
          </NavLink>
          <NavLink
            to="/poloshirt"
            className={`navbar-item ${menu === "Poloshirt" ? "active" : ""}`}
            onClick={() => setMenu("Poloshirt")}
          >
            News Fashion
          </NavLink>
          <NavLink
            to="/trouser"
            className={`navbar-item ${menu === "Trouser" ? "active" : ""}`}
            onClick={() => setMenu("Trouser")}
          >
            Help
          </NavLink>
        </ul>
      </div>
      <div className="list-input">
        <input
          className="input-item"
          type="text"
          placeholder="Tìm kiếm ..."
          value={searchTerm}
          onChange={handleFilterChange}
        />

        <div className="icon">
          <CiSearch />
        </div>
      </div>
      <div className="cart">
        <MdShoppingCart
          fontSize={"30px"}
          onClick={() => navigate("/shoppingcart")}
        />
        <p className="quantity">0</p>
      </div>

      <div className="notify-icon">
        <div className="notify-icon">
          <IoIosNotifications fontSize={"30px"} onClick={handoleshowio} />
        </div>
        <p className="quantity">0</p>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-1">
        {userName ? (
          <div className="user-info">
            <img
              src={avatar || "default-avatar.jpg"}
              alt="Avatar"
              className="avatar"
            />
            <span className="user">{userName}</span>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              <IoIosLogOut />
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>

      {searchTerm && recort.length > 0 && showSearchBox && (
        <div className="filter-list">
          <button className="btn" onClick={handoleshowhide}>
            x
          </button>
          <button className="btn" onClick={handoleshowhide}>
            x
          </button>
          {recort.map((item, index) => (
            <div className="filter-item" key={index}>
              <img className="filter-img" src={item.url_img} alt="" />
              <p className="filter-title">{item.name}</p>
              <span className="filter-price">
                {item.price}
                <span className="ml-3">đ</span>
              </span>
              <hr color="red" />
            </div>
          ))}
        </div>
      )}

      {searchTerm &&
        recort.length === 0 &&
        noDataFound &&
        toast.error("Không tìm thấy sản phẩm!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })}
      {showDropdown && <Notification />}
      <ToastContainer />
    </div>
  );
};

export default Header;
