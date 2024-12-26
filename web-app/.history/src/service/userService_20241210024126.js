import axios from "axios";
import { getToken } from "./authService"; // Đảm bảo rằng bạn có hàm getToken để lấy token

const API_BASE_URL = "http://localhost:8081/api";

export const getUserById = async (userId) => {
  return await axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};