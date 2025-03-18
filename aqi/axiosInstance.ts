import axios from 'axios';

export const axiosInstance = axios.create({
	// baseURL: 'https://api.purpleair.com/v1',
	withCredentials: true,
	withXSRFToken: true,
});
