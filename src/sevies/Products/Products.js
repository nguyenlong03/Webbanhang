import Axioscustom from "../axioscustom/Axioscustom";

const ProductsApi = {
  getALL(params) {
    const url = "/api/products?type=all&page=1";
    console.log(`Request URL: ${Axioscustom.defaults.baseURL}${url}`);
    return Axioscustom.get(url, { params });
  },
  get(id) {
    const url = `"/api/products?type=all&page=1"/${id}`;
    return Axioscustom.get(url);
  },
  add(data) {
    const url = "/api/products?type=all&page=1";
    return Axioscustom.post(url, data);
  },
  update(data) {
    const url = `/api/products?type=all&page=1/${data.id}`;
    return Axioscustom.patch(url, data);
  },
  remove(id) {
    const url = `/api/products?type=all&page=1/${id}`;
    return Axioscustom.delete(url);
  },
};
export default ProductsApi;
