import Detail from "./Detail/Detail";
import { useState, useEffect } from "react";

const ChitietSanPham = (param) => {
  const [data1, setdata1] = useState([]);

  useEffect(() => {
    const calldata = async () => {
      try {
        const response = await Detail.getALL(param);
        console.log("checck data chitiet san pham ", response);
        setdata1(response);
      } catch (error) {
        console.log("error", error);
      }
    };

    calldata();
  }, [param]);

  return data1;
};

export default ChitietSanPham;
