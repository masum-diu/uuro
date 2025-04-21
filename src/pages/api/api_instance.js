import axios from "axios";
const instance = axios.create({
  baseURL: "https://engine.uurotravels.com/api",

  headers: { 
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
