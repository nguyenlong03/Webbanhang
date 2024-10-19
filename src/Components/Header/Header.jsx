import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Seach from "../../services/Seach/Seach";
import Notification from "../../Pages/Notify/Notify";
import logo from "../../assets/imgs/images.png";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { addNotification } from "../../redux/notificationReducer";
import { clearNotifications } from "../../redux/notificationReducer";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const notifications = useSelector((state) => state.notification.messages);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
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
  const dispatch = useDispatch();

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

  const handlechitietsanphamfiter = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
    setShowSearchBox(false);
    setSearchTerm("");
  };
  const handoleHelp = () => {
    setMenu("Trouser");
    navigate("/trouser");
  };

  const handleScrollToSale = () => {
    setMenu("Hot Sale");
    const SaleElement = document.querySelector(".products-container");
    if (SaleElement) {
      SaleElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToProducts = () => {
    setMenu("Products");
    const productsElement = document.querySelector(".container-cart");
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToFooter = () => {
    setMenu("Contact");
    const footerElement = document.querySelector(".app-footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  const handleHonelogo = () => {
    setMenu("Home");
    navigate("/");
  };

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

  const fetchData = async (keyword) => {
    if (!keyword) {
      setRecort([]);
      setNoDataFound(false);
      return;
    }

    try {
      const response = await Seach.getALL(keyword);

      if (response.products.length > 0) {
        const testdataa = response.products;
        console.log("testdataa img", testdataa);
        setRecort(response.products);
        setNoDataFound(false);
      } else {
        setRecort([]);
        setNoDataFound(true);
      }
    } catch (error) {
      console.log("error", error);
      setRecort([]);
      setNoDataFound(true);
    }
  };
  const handoleshowhide = () => {
    setShowSearchBox(false);
  };
  const handoleshowio = () => {
    setShowDropdown(!showDropdown);
  };
  const hanoleShoppingcart = async () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
    navigate("/shoppingcart");
  };

  // Dispatch a notification when a product is added to the cart
  useEffect(() => {
    if (totalQuantity > 0) {
      dispatch(
        addNotification({
          message: "Bạn có sản phẩm trong giỏ hàng",
          time: new Date().toLocaleTimeString(),
        })
      );
    }
    if (totalQuantity === 0) {
      dispatch(
        clearNotifications({
          message: "Bạn không có sản phẩm nào trong giỏ hàng",
        })
      );
    }
  }, [totalQuantity, dispatch]);

  return (
    <div className="Header-container">
      <img className="img-header" src={logo} alt="" onClick={handleHonelogo} />
      <div className="header-list">
        <ul className="list-navbar">
          <div
            to="/"
            className={`navbar-item ${menu === "Home" ? "active" : ""}`}
            onClick={() => {
              setMenu("Home");
              navigate("/");
            }}
          >
            Home
          </div>

          <div
            className={`navbar-item ${menu === "Hot Sale" ? "active" : ""}`}
            onClick={() => handleScrollToSale()}
          >
            Hot Sale
          </div>

          <div
            className={`navbar-item ${menu === "Products" ? "active" : ""}`}
            onClick={() => handleScrollToProducts()}
          >
            Products
          </div>

          <div
            className={`navbar-item ${menu === "Contact" ? "active" : ""}`}
            onClick={() => handleScrollToFooter()}
          >
            News Fashion
          </div>
          <div
            to="/trouser"
            className={`navbar-item ${menu === "Trouser" ? "active" : ""}`}
            onClick={handoleHelp}
          >
            Help
          </div>
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

      <div className="icon-header">
        <div className="cart">
          <MdShoppingCart onClick={hanoleShoppingcart} />
          {totalQuantity > 0 && (
            <span className="quantity">{totalQuantity}</span>
          )}
        </div>

        <div className="notify-icon">
          <div className="notify-icon">
            <IoIosNotifications fontSize={"35px"} onClick={handoleshowio} />
          </div>
          {totalQuantity > 0 && (
            <span className="quantity">{totalQuantity}</span>
          )}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3">
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
            <div className="login-regitster d-flex gap-2 w-100px ">
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
              <div
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Register
              </div>
            </div>
          )}
        </div>
        {searchTerm && recort.length > 0 && showSearchBox && (
          <div className="filter-list">
            <button className="btn" onClick={handoleshowhide}>
              x
            </button>
            {recort.map((item, index) => (
              <div className="filter-item" key={index}>
                <img
                  className="filter-img"
                  src={item.url_image}
                  alt={item.name}
                />
                <p
                  className="filter-title"
                  onClick={() => handlechitietsanphamfiter(item.id)}
                >
                  {item.name}
                </p>
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

        {showDropdown && <Notification notifications={notifications} />}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Header;
