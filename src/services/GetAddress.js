import { getProvinces, getDistricts, getWards } from "./CateloryApi/AddressAPI";
import { useState, useEffect } from "react";

const GetAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);

  // Lấy danh sách tỉnh khi component được mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesData = await getProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Lấy danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const districtsData = await getDistricts(selectedProvince);
          setDistricts(districtsData);
          setWards([]); // Reset danh sách phường/xã khi chọn tỉnh mới
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const wardsData = await getWards(selectedDistrict);
          setWards(wardsData);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  return {
    provinces,
    districts,
    wards,
    setSelectedProvince,
    setSelectedDistrict,
  };
};

export default GetAddress;
