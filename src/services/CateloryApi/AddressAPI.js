import ApiAddress from "../axioscustom/AxioscustomAddress";

// Hàm lấy danh sách tỉnh
const getProvinces = async () => {
  try {
    const response = await ApiAddress.get("province");
    console.log("Danh sách tỉnh:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh:", error);
    throw new Error("Không thể lấy danh sách tỉnh.");
  }
};

// Hàm lấy danh sách quận/huyện theo tỉnh
const getDistricts = async (provinceId) => {
  try {
    const response = await ApiAddress.get(`province/district/${provinceId}`);
    console.log(`Danh sách quận/huyện của tỉnh ${provinceId}:`, response);
    return response;
  } catch (error) {
    console.error(
      `Lỗi khi lấy danh sách quận/huyện của tỉnh ${provinceId}:`,
      error
    );
    throw new Error(
      `Không thể lấy danh sách quận/huyện cho tỉnh ${provinceId}.`
    );
  }
};

// Hàm lấy danh sách phường/xã theo quận
const getWards = async (districtId) => {
  try {
    const response = await ApiAddress.get(`province/ward/${districtId}`);
    console.log(`Danh sách phường/xã của quận ${districtId}:`, response);
    return response;
  } catch (error) {
    console.error(
      `Lỗi khi lấy danh sách phường/xã của quận ${districtId}:`,
      error
    );
    throw new Error(
      `Không thể lấy danh sách phường/xã cho quận ${districtId}.`
    );
  }
};

// Xuất các hàm
export { getProvinces, getDistricts, getWards };
