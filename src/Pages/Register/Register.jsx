import { useState } from "react";
import "./Register.scss";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AutherAPi from "../../services/userlogin/userlogin";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AutherAPi.register(
        email,
        password,
        firstName,
        lastName,
        confirmPassword
      );
      console.log(response);
      if (response && response.errCode === 0) {
        toast.success(" Đăng ký thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("đăng nhập rồi");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleRegister}>
        <h1>Register </h1>
        <p>Signup now and get full access to our app. </p>
        <div className="flex-row">
          <label>
            <input
              type="text"
              placeholder=""
              required=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              type="text"
              placeholder=""
              required=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Lastname</span>
          </label>
        </div>

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

          <label>
            <input
              type="password"
              placeholder=""
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </label>
          <label>
            <input
              type="password"
              placeholder=""
              required=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit">
            Register
          </button>
          <p>
            Bạn đã có tài khoản? <NavLink to={"/login"}>Sign In</NavLink>
          </p>
        </div>
        <div className="loginWith">
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
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
