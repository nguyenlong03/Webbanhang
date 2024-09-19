import Axioscustom from "../axioscustom/Axioscustom";

const AutherAPi = {
  login(email, password) {
    const url = "/api/login";
    return Axioscustom.post(url, { email, password });
  },

  register(email, password) {
    const url = "/api/register";
    return Axioscustom.post(url, { email, password });
  },
};
export default AutherAPi;
