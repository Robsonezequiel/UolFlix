import axios from "axios";

const api = axios.create({
  baseURL: "http://54.94.39.34:3333",
});

const bearerToken = `Bearer ${localStorage.getItem("@uolflix:loginToken")}`;

localStorage.getItem("@uolflix:loginToken") &&
  (api.defaults.headers.common["Authorization"] = bearerToken);

export default api;
