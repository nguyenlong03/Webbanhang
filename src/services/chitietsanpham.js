import Detail from "./Detail/Detail";
import { useState, useEffect } from "react";

const ChitietSanPham = (param) => {
  const [data1, setdata1] = useState([]);

  useEffect(() => {
    const calldata = async () => {
      try {
        const response = await Detail.getALL(param);
        console.log("Kết quả:", response[0].url_img);
        setdata1(response[0]);
      } catch (error) {
        console.log("error", error);
      }
    };

    calldata();
  }, [param]);

  return data1;
};

export default ChitietSanPham;
