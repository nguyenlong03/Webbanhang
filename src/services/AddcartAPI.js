import Axioscustom from "./axioscustom/Axioscustom";
const AddcartAPI = {
  Addtocart(params) {
    const url = "/api/add-to-cart";
    return Axioscustom.post(url, params);
  },
  Getcart(params) {
    const url = "/api/get-cart";
    return Axioscustom.get(url, params);
  },
  Deletecart(params) {
    const url = "/api/delete-cart";
    return Axioscustom.post(url, params);
  },
};
export default AddcartAPI;
