import "./profile.scss";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const handleShoppingCart = () => {
    navigate("/shoppingcart");
  };
  const handleChangePassword = () => {
    navigate("/changepassword");
  };
  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="profile-account">
          <div className="img-profile">
            <img src="" />
          </div>
          <div className="info-account">My Account</div>
        </div>
        <div className="profile">
          <div className="profile-list">
            <div className="item">Thông tin tài khoản</div>
            <div className="item" onClick={handleShoppingCart}>
              Giỏ hàng của tôi
            </div>
            <div className="item">Đơn hàng của tôi</div>
            <div className="item" onClick={handleChangePassword}>
              Đôi mật khẩu
            </div>
            <div className="item">Cài đặt</div>
            <div className="item">Đăng xuất</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
