import ProductsApi from "./Products/Products";
import { useState, useEffect } from "react";

const ProductService = (filter, page) => {
  const [data, setData] = useState(() => {
    const key = `productsData-${filter}-${page}`;
    const savedData = sessionStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAPI = async () => {
      const key = `productsData-${filter}-${page}`;
      setLoading(true);
      setError(null);

      const cachedData = sessionStorage.getItem(key);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await ProductsApi.getALL(filter, page);
        const products = response.products || [];
        setData(products);
        sessionStorage.setItem(key, JSON.stringify(products)); // Save fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [filter, page]);

  return { data, loading, error };
};

export default ProductService;
