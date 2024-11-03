import axios from 'axios'

export async function getCategories() {
	const { data } = await axios(`${import.meta.env.VITE_API}/categories/1/sub`)
	return data
}

export async function getCategoriesById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/categories/sub/${id}`)
	return data
}
