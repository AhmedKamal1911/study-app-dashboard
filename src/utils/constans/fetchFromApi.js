import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:3000/v1',
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
