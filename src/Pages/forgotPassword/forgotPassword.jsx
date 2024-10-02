import { useState } from "react";
import AutherAPi from "../../services/userlogin/userlogin";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await AutherAPi.forgotpassword(email);
      console.log("checkdata", res);

      if (res) {
        setOtpSent(true);
        toast.success(
          `OTP đã được gửi thành công. Vui lòng kiểm tra email ${email} của bạn.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        toast.error(res.errMessage || "Không thể gửi OTP. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      alert("error.message");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await AutherAPi.resetPassword(
        email,
        otp,
        password,
        confirmPassword
      );
      if (res && res.errCode === 0) {
        toast.success("Đặt lại mật khẩu thành công!", {
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
          navigate("/login");
        }, 2000);
      } else {
        toast.error(
          res.errMessage ||
            "Không thể đặt lại mật khẩu. Vui lòng kiểm tra thông tin của bạn."
        );
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="container">
      <form
        className="form-sendPassword"
        onSubmit={otpSent ? handleResetPassword : handleSendOtp}
      >
        <h1>Quên Mật Khẩu</h1>
        <p>
          Nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn một mã
          OTP để đặt lại mật khẩu.
        </p>
        <div className="getOtp">
          <div className="sendOtp">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />
            {!otpSent && (
              <button className="sendOtp" type="submit" onClick={handleSendOtp}>
                Lấy OTP
              </button>
            )}
          </div>
          {otpSent && (
            <div className="otp">
              <p>Kiểm tra email của bạn</p>
              <span>
                Chúng tôi đã gửi một mã OTP đến email của bạn. Vui lòng nhập mã
                5 chữ số dưới đây.
              </span>
              <input
                type="text"
                placeholder="Nhập mã OTP..."
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <a href="">Lấy lại OTP</a>
            </div>
          )}
        </div>

        {otpSent && (
          <div className="reset-passWord">
            <p>Vui lòng nhập mật khẩu mới!</p>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              required
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Đặt lại mật khẩu</button>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
