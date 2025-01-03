import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

export const getIngredients = async () => {
  return await axios.get(`${API_BASE_URL}/ingredients`);
};