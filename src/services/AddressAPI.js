import Address from "./axioscustom/AxioscustomAddress";

export const getProvinces = async () => {
  try {
    const response = await Address.get("/");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await Address.get(`/district/${provinceId}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

export const getWards = async (districtId) => {
  try {
    const response = await Address.get(`/ward/${districtId}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching wards:", error);
    return [];
  }
};
