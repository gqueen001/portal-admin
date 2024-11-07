import axios from 'axios'
import { CategoryById } from '../../types/openModal'

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
			tk: values.titleTk,
			ru: values.titleRu,
		},
	})
	return data
}

export async function createNewCategory(values: CategoryById) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/categories/sub`, {
		title: {
			tk: values.titleTk,
			ru: values.titleRu,
		},

		category_id: 1,
	})
	return data
}

export async function deleteCategory(id: number) {
	const { data } = await axios.delete(`${import.meta.env.VITE_API}/categories/sub/${id}`)
	return data
}
