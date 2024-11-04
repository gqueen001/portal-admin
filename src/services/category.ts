import axios from 'axios'
import { CategoryById } from '../types/modal'

export async function getCategories() {
	const { data } = await axios(`${import.meta.env.VITE_API}/categories/1/sub`)
	return data
}

export async function getCategoriesById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/categories/sub/${id}`)
	return data
}

export async function updateCategoriesById(values: CategoryById, id: number) {
	const { data } = await axios.put(`${import.meta.env.VITE_API}/categories/sub`, {
		id,
		title: {
			tk: values.titletk,
			ru: values.titleru,
		},
	})
	return data
}

export async function createNewCategory(values: CategoryById) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/categories/sub`, {
		title: {
			tk: values.titletk,
			ru: values.titleru,
		},

		category_id: 1,
	})
	return data
}
