import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { FaGoogle, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AutherAPi from "../../sevies/userlogin/userlogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AutherAPi.login(email, password);
      console.log(response);
      if (response && response.errCode === 0) {
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("avatar", response.avatar);
        toast.success("🦄 Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 5000,
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
        toast.error(response.errMessage);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
      console.error("Login error:", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  if (localStorage.getItem("token")) {
    return null; // Hoặc bạn có thể trả về một loader nếu cần
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Signup now and get full access to our app.</p>
        <div className="flex-col">
          <label>
            <input
              type="email"
              placeholder=""
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <label className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i onClick={handleShowPassword} className="password-icon">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
          </label>

          <span>
            Bạn quên mật khẩu? <a href="">Nhấn vào đây!</a>
          </span>

          <button className="submit" type="submit">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="login">
          <button>
            <i>
              <FaGoogle />
            </i>
            Đăng nhập với Google
          </button>

          <button>
            <i>
              <FaFacebookF />
            </i>
            Đăng nhập với Facebook
          </button>
        </div>
        <span>
          Đăng ký ngay <NavLink to="/register">tại đây</NavLink> !
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
