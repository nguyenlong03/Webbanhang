import Axioscustom from "../axioscustom/Axioscustom";

const AutherAPi = {
  login(email, password) {
    const url = "/api/register";
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
};
export default AutherAPi;
