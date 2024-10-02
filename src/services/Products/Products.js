import Axioscustom from "../axioscustom/Axioscustom";

const ProductsApi = {
  getALL(param, page) {
    const url = `/api/products?type=${param}&page=${page}`;

    return Axioscustom.get(url, { param, page });
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
