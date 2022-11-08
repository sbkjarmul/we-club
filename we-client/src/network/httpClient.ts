import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': createAuthHeader()
  }
});

function createAuthHeader() {
  const token = JSON.parse(String(localStorage.getItem('token')))
  return `Bearer ${token}`;
};

export default axiosClient