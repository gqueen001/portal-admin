import axios from 'axios'
import { Login } from '../types/login'

export async function createLogin(value: Login) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/sign-in`, {
		login: value.login,
		password: value.password,
	})
	return data
}
