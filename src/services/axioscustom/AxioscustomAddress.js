import axios from "axios";

// Tạo instance của Axios cho API Address
const ApiAddress = axios.create({
  baseURL: "/api/",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // Sử dụng biến môi trường cho API Key
    Accept: "application/json",
  },
});

// Interceptor cho request
ApiAddress.interceptors.request.use(
  (config) => {
    console.log("Đang gửi yêu cầu tới:", config.url);
    return config;
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    console.error("Lỗi trong yêu cầu:", error.message);
    return Promise.reject(error);
  }
);

// Interceptor cho response
ApiAddress.interceptors.response.use(
  (response) => {
    return response.data; // Trả về dữ liệu API
  },
  (error) => {
    // Xử lý lỗi phản hồi
    if (error.response) {
      // Phản hồi từ server (có mã trạng thái)
      console.error(
        "Lỗi phản hồi từ server:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error("Không nhận được phản hồi:", error.request);
    } else {
      // Xử lý các lỗi khác
      console.error("Lỗi khác:", error.message);
    }
    return Promise.reject(error);
  }
);

export default ApiAddress;
