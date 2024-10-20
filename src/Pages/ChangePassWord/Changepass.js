import "./change.scss";

const ChangePassword = () => {
  return (
    <div className="container">
      <form className="form-change">
        <h1>Change Password</h1>
        <div className="pass">
          <label for="current-password">
            <input
              type="password"
              id="current-password"
              name="current-password"
              required
            />
            <span>Current Password</span>
          </label>
        </div>
        <div className="pass">
          <label for="new-password">
            <input
              type="password"
              id="new-password"
              name="new-password"
              required
            />
            <span>New Password</span>
          </label>
        </div>
        <div className="pass">
          <label for="confirm-password">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            <span>Confirm Password</span>
          </label>
        </div>
        <div className="btn">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
};
export default ChangePassword;
