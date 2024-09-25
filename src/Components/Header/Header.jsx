import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [menu, setMenu] = useState(localStorage.getItem("menu") || "Home");
  const [search, setSearch] = useState("");

  const handoleSeach =(e)=>{
    console.log(e.target.value)
  }
  const handoleHome =()=>{
    setMenu("Home")
    navigate('/')
   
  }

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
          navigate("/");
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


 

  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  return (
    <div className="Header-container">
      <img
        className="img-header"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTtK81Da5Yxc8RBdicC3hJO8CiRkQ4UsezA&s"
        alt=""
        onClick={ handoleHome}
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
        <input className="input-item" type="text" placeholder="Tìm kiếm ..." onChange={handoleSeach} />
        <div className="icon">
          <CiSearch />
        </div>
        <MdShoppingCart fontSize={"30px"} />
            {/* thông báo có giỏ hàng */}
        <div className="icon11"></div>    
      </div>
      <div className="d-flex justify-content-center align-items-center gap-1 ">
        {userName ? (
          <div className="user-info">
            <img src={avatar || "default-avatar.jpg"} alt="Avatar" className="avatar" />
            <span className="user">{userName}</span>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              <IoIosLogOut />
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary">Login</NavLink>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
