import { useState } from "react";
import "./Login.scss";
import { FaGoogle, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AutherAPi from "../../sevies/userlogin/userlogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("false");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    console.log("Login");
    e.preventDefault();
    try {
      const response = await AutherAPi.login(email, password);
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(showPassword === "false" ? "true" : "false");
  };

  return (
    <div className="container">
      <form class="form">
        <h1>Login </h1>
        <p>Signup now and get full access to our app. </p>
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
              type={showPassword === "true" ? "text" : "password"}
              placeholder=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i onClick={handleShowPassword} className="password-icon">
              {showPassword === "true" ? <FaEye /> : <FaEyeSlash />}
            </i>
          </label>

          <span>
            Bạn quên mật khẩu? <a href="">Nhấn vào đây!</a>
          </span>

          <button class="submit" onClick={handleLogin}>
            Login
          </button>
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
            Đăng nhập với Google
          </button>
        </div>
        <span>
          Đăng ký ngay <NavLink to="/register">tại đây</NavLink> !
        </span>
      </form>
    </div>
  );
}

export default Login;
