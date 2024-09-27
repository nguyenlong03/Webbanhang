import Detail from "./Detail/Detail";
import { useState, useEffect } from "react";

const ChitietSanPham = (param) => {
  const [data1, setdata1] = useState([]);

  useEffect(() => {
    const calldata = async () => {
      try {
        const response = await Detail.getALL(param);
        console.log("checck ", response[0]);
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
