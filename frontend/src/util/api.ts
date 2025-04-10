import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3001",
});

apiClient.interceptors.response.use(
	(response) => response,
	(e) => Promise.reject(e.response.data),
);

export default apiClient;
