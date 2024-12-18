import axios from "axios";

const API_BASE_URL_AUTH = "http://localhost:8080/api/auth";
c

export const getUserById = async (userId) => {
  return await axios.get(`${API_BASE_URL_AUTH}/${userId}`);
};

export const getProfile = async (profileId) => {
    return await axios.get(`${API_BASE_URL}/users/${profileId}`);
  };