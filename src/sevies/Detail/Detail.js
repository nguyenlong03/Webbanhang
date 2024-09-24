import Axioscustom from "../axioscustom/Axioscustom";

const Detail = {
  getALL(param) {
    const url = `/api/product/${param}`;
    return Axioscustom.get(url, { param });
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
export default Detail;
