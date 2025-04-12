import axios from "axios";

const url = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const apiClient = axios.create({
	baseURL: url,
});

apiClient.interceptors.response.use(
	(response) => response,
	(e) => Promise.reject(e.response.data),
);

export default apiClient;
