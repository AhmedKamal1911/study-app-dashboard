import axios from "axios";
const instance = axios.create({
  baseURL: "https://educational-platform-nestjs-api.onrender.com/v1",
});
const fetchFromAPI = async (options) => {
  try {
    const { data } = await instance(options);
    return data;
  } catch (error) {
    throw error;
  }
};
export default fetchFromAPI;
