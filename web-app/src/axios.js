// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // URL của backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
