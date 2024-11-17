import type { AxiosError, AxiosInstance } from 'axios'
import baseAxios from 'axios'

let baseURL = `${import.meta.env.VITE_API_URL}`

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
		if (error.response?.status === 403 || error.response?.status === 401) {
			localStorage.removeItem('token')
		}
		return Promise.reject(error)
	})
	return instance
}

const axios = getAxios()
export default axios
