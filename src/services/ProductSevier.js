import ProductsApi from "./Products/Products";
import { useState, useEffect } from "react";

// Custom hook để lấy dữ liệu sản phẩm
const useProductService = (param, page) => {
  const [data, setData] = useState(() => {
    // Kiểm tra nếu đã có dữ liệu trong sessionStorage thì dùng nó
    const savedData = sessionStorage.getItem("productsData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(data.length === 0); // Nếu có dữ liệu thì không cần loading
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ProductsApi.getALL(param, page);
        setData(response.products);
        console.log("checkdata", response);
        setTotalPage(response.totalPage);
        console.log("checktotalpage", response.totalPage);
        sessionStorage.setItem(
          "productsData",
          JSON.stringify(response.products)
        );
      } catch (error) {
        console.error("404 or other error:", error);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [param, page]); // Chỉ cần phụ thuộc vào param và page

  return { data, loading, error, totalPage };
};

export default useProductService;
