import axios from "axios";

const API_BASE_URL_AUTH = "http://localhost:8080/api/auth";
const API_BASE_URL = "http://localhost:8084";

export const getUserById = async (userId) => {
  return await axios.get(`${API_BASE_URL_AUTH}/${userId}`);
};

export const getProfile = async (profileId) => {
    return await axios.get(`${API_BASE_URL}/users/${profileId}`);
  };

  export const updateProfile = async (profileId, profileData) => {
    return await axios.put(`${API_BASE_URL}/users/${profileId}`, profileData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };