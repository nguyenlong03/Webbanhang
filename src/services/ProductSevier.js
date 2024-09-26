import ProductsApi from "./Products/Products";
import { useState, useEffect } from "react";
// api dùng chung cho producs cart
const ProductService = (param, page = 1) => {
  const [data, setData] = useState(() => {
    // Kiểm tra nếu đã có dữ liệu trong sessionStorage thì dùng nó
    const savedData = sessionStorage.getItem("productsData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(data.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchAPI = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await ProductsApi.getALL(param, page);

          setData(response.products);
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
    }
  }, [param, page, data.length]);

  return { data, loading, error };
};

export default ProductService;
