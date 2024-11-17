import axios from '@/plugins/axios'
import { CategoryById } from '@/types/modal/openModal'

export async function getCategories() {
	const { data } = await axios(`/categories/1/sub`)
	return data
}

export async function getCategoriesById(id: number) {
	const { data } = await axios(`/categories/sub/${id}`)
	return data
}

export async function updateCategoriesById(values: CategoryById, id: number) {
	const { data } = await axios.put(`/categories/sub`, {
		id,
		title: {
			tk: values.titleTk,
			ru: values.titleRu,
		},
	})
	return data
}

export async function createNewCategory(values: CategoryById) {
	const { data } = await axios.post(`/categories/sub`, {
		title: {
			tk: values.titleTk,
			ru: values.titleRu,
		},

		category_id: 1,
	})
	return data
}

export async function deleteCategory(id: number) {
	const { data } = await axios.delete(`/categories/sub/${id}`)
	return data
}
