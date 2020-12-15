import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.99:5000/api/v1",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});