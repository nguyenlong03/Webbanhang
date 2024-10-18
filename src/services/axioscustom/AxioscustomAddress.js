import axios from "axios";

const Address = axios.create({
  baseURL: "https://vapi.vnappmob.com/api/province",
  headers: {
    Accept: "application/json",
  },
});
export default Address;
