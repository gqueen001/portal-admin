import axios from 'axios'
import { DataOfMusic } from '../types/musics/musics'

export async function getBooks() {
	const { data } = await axios(`${import.meta.env.VITE_API}/books/admin`)
	return data
}

export async function getBookById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/books/${id}`)
	return data
}

export async function updateBookById(value: DataOfMusic, id: number) {
	const { data } = await axios.put(`${import.meta.env.VITE_API}/books`, {
		id,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}
