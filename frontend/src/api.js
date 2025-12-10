// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 🔴 IMPORTANT: this must match Flask port
});

export default api;
