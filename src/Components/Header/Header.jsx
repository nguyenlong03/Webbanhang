import React from "react";
import { useState } from "react";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const [menu, setmenu] = useState("Home");
  return (
    <div className="Header-container ">
      <img
        className="img-header"
        src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTtK81Da5Yxc8RBdicC3hJO8CiRkQ4UsezA&s"
        alt=""
      />
      <div className="header-list">
        <ul className="list-navbar">
          <li className={`navbar-item ${menu=== "Home"? "active":""}`} onClick={()=>setmenu("Home")}>Home</li>
          <li className={`navbar-item ${menu=== "T-shirt"? "active":""}`} onClick={()=>setmenu("T-shirt")}>T-shirt</li>
          <li className={`navbar-item ${menu=== "Dress"? "active":""}`} onClick={()=>setmenu("Dress")}>Dress</li>
          <li className={`navbar-item ${menu=== "Poloshirt"? "active":""}`} onClick={()=>setmenu('Poloshirt')}>Poloshirt</li>
          <li className={`navbar-item ${menu=== "Trouser"? "active":""}`} onClick={()=>setmenu('Trouser')}> Trouser</li>
          <li className={`navbar-item ${menu=== "TrouserShort"? "active":""}`} onClick={()=>setmenu('TrouserShort')}>TrouserShort</li>
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
        <button type="button" class="btn btn-success">
          login
        </button>
        <button type="button" class="btn btn-danger">
        <IoIosLogOut/>
        </button>
      </div>
    </div>
  );
};

export default Header;
