import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

export const getIngredients = async () => {
  return await axios.get(`${API_BASE_URL}/ingredients`);
};

export const getIngredientByName = async (ied) => {
  return await axios.get(`${API_BASE_URL}/ingredients/${id}`);
};