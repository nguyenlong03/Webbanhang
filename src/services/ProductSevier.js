import ProductsApi from "./Products/Products";
import { useState, useEffect } from "react";

const ProductService = (filter, page) => {
  const [data, setData] = useState(() => {
    // Kiểm tra nếu đã có dữ liệu trong sessionStorage thì dùng nó, ngược lại trả về mảng rỗng
    const savedData = sessionStorage.getItem("productsData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(true); // Đặt loading mặc định là true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true); // Đặt lại loading mỗi khi dữ liệu mới được gọi
      setError(null); // Đặt lại error nếu trước đó có lỗi
      try {
        const response = await ProductsApi.getALL(filter, page);
        console.log("response", response.products);
        setData(response.products || []); // Nếu không có products, trả về mảng rỗng
        sessionStorage.setItem(
          "productsData",
          JSON.stringify(response.products || [])
        );
      } catch (error) {
        console.error("404 or other error:", error);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false); // Dừng trạng thái loading khi kết thúc
      }
    };

    fetchAPI();
  }, [filter, page]); // Mỗi khi filter hoặc page thay đổi, dữ liệu sẽ được tải lại.

  return { data, loading, error };
};

export default ProductService;
