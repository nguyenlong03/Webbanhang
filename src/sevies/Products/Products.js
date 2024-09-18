import Axioscustom from "../axioscustom/Axioscustom";

const ProductsApi = {
  getALL(params) {
    const url = "posts";
    return Axioscustom.get(url, { params });
  },
  get(id) {
    const url = `posts/${id}`;
    return Axioscustom.get(url);
  },
  add(data) {
    const url = "posts";
    return Axioscustom.post(url, data);
  },
  update(data) {
    const url = `posts/${data.id}`;
    return Axioscustom.patch(url, data);
  },
  remove(id) {
    const url = `posts/${id}`;
    return Axioscustom.delete(url);
  },
};
export default ProductsApi;
