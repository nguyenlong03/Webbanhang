import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { FaGoogle, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AutherAPi from "../../sevies/userlogin/userlogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AutherAPi.login(email, password);
      if (response && response.errCode === 0) {
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("avatar", response.avatar);
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/"); // Chuyển hướng về trang chính
        }, 2000);
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="flex-col">
          <label>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i onClick={handleShowPassword} className="password-icon">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
          </label>
          <button className="submit" type="submit">
            Login
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
