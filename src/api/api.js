import axios from "axios";

const baseUrl = "https://cobradev.azurewebsites.net";

export const GetHomeKpiData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard_Data`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};

export const GetAllCases = async (payload) => {
  let formData = new FormData();
  formData.set("");

  try {
    const response = await axios.post(`${baseUrl}/`, formData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};
