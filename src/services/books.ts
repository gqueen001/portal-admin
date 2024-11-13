import axios from 'axios'

export async function getBook() {
	const { data } = await axios(`${import.meta.env.VITE_API}/books?page=1&count=10}`)
	return data
}
