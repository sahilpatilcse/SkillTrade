import axios from "axios";

const API = axios.create({
  baseURL: "https://skilltrade-backend-g4mq.onrender.com",
});

export default API;