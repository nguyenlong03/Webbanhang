import Axioscustom from "../axioscustom/Axioscustom";

const CateloryApi = {
  getALL(params) {
    const url = "photos";
    return Axioscustom.get(url, { params });
  },
  get(id) {
    const url = `photos/${id}`;
    return Axioscustom.get(url);
  },
  add(data) {
    const url = "photos";
    return Axioscustom.post(url, data);
  },
  update(data) {
    const url = `photos/${data.id}`;
    return Axioscustom.patch(url, data);
  },
  remove(id) {
    const url = `photos/${id}`;
    return Axioscustom.delete(url);
  },
};
export default CateloryApi;
