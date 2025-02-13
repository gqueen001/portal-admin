import axios from '@/plugins/axios'
import { Login } from '@/types/index'

export async function createLogin(value: Login) {
	const { data } = await axios.post(`/auth/sign-in`, {
		login: value.login,
		password: value.password,
	})
	return data
}
