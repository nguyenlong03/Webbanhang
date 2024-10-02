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

  forgotpassword(email) {
    const url = "/api/getOtp";
    return Axioscustom.post(url, { email });
  },

  resetPassword(email, otp, password, confirmPassword) {
    const url = "/api/forgot-password";
    return Axioscustom.post(url, { email, otp, password, confirmPassword });
  },
};
export default AutherAPi;
