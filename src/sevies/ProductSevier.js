import ProductsApi from "./Products/Products";
import { useState, useEffect } from "react";
// làm API chung cho phần sản phẩm gồm 6 sản phẩm homecart .....
// nếu page không tồn tại thì cố định là page 1
const ProductSevier = (param, page) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await ProductsApi.getALL(param, page);
        setData(response.products);
      } catch (error) {
        console.log("404", error);
      }
    };
    fetchAPI();
  }, []);

  return { data };
};
export default ProductSevier;
