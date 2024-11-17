import type { AxiosError, AxiosInstance } from 'axios'
import baseAxios from 'axios'

// import store from '@/store';
// import { setAuthentication } from '@/store/auth/authSlice';

// import createAuthRefreshInterceptor from 'axios-auth-refresh';

// const baseURL = '/reports-api';
// const baseURL = import.meta.env.VITE_API_URL;

let baseURL = `${import.meta.env.VITE_API}`

// if (window.location.hostname === '172.16.208.66') {
//     baseURL = 'http://172.16.208.66:8083';
// } else {
//     baseURL = 'http://95.85.108.119:8083';
// }

export const getAxios = (): AxiosInstance => {
	const instance = baseAxios.create({
		baseURL,
		headers: { 'Content-Type': 'application/json' },
	})

	instance.interceptors.request.use((config: { headers: any; params?: any }) => {
		if (!config.headers.Authorization) {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		}
		return config
	})

	instance.interceptors.response.use(undefined, (error: AxiosError) => {
		if (error.response?.status === 403) {
			localStorage.removeItem('token')
			// store.dispatch(setAuthentication(false));
		}
		return Promise.reject(error)
	})
	return instance
}

const axios = getAxios()
export default axios
