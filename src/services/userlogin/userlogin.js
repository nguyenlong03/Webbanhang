import Axioscustom from "../axioscustom/Axioscustom";

const AutherAPi = {
  login(email, password) {
    const url = "/api/login";
    return Axioscustom.post(url, { email, password });
  },

  register(email, password, firstName, lastName, confirmPassword) {
    const url = "/api/register";
    return Axioscustom.post(url, {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
    });
  },
  forgotpassword(email, otp, newPassword, confirmPassword) {
    const url = "/api/forgotpassword";
    return Axioscustom.post(url, { email, otp, newPassword, confirmPassword });
  }
};
export default AutherAPi;
