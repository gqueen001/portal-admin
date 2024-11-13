import axios from 'axios'

export async function getBooks() {
	const { data } = await axios(`${import.meta.env.VITE_API}/books/admin`)
	return data
}
