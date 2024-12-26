import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

export const getUserById = async (userId) => {
  return await axios.get(`${API_BASE_URL}/${userId}`);
};