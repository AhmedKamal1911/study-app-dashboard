import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3005",
  timeout: 5000,
  headers: {
    "Content-type": "application/json; charset=utf-8",
  },
});
const fetchFromAPI = async (options) => {
  try {
    const { data } = await instance(options);
    return data;
  } catch (error) {
    throw error.message;
  }
};
export default fetchFromAPI;
