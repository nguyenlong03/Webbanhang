import Detail from "./Detail/Detail";
import { useState, useEffect } from "react";

const ChitietSanPham = () => {
  const [data1, setdata1] = useState([]);
  useEffect(() => {
    const calldata = async () => {
      try {
        const respon = await Detail.getALL();
        console.log("Kết quả:", respon[0].url_img);
        setdata1(respon[0]);
      } catch (error) {
        console.log("erro", error);
      }
    };

    calldata();
  }, []);
  return data1;
};

export default ChitietSanPham;
