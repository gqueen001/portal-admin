import axios from '@/plugins/axios'
import { DataOfMusAndBooks } from '../types/musicsAndBook'

export async function getBooks() {
	const { data } = await axios(`/books/admin`)
	return data
}

export async function getBookById(id: number) {
	const { data } = await axios(`/books/${id}`)
	return data
}

export async function updateBookById(value: DataOfMusAndBooks, id: number) {
	const { data } = await axios.put(`/books`, {
		id,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function createNewBook(value: DataOfMusAndBooks) {
	const { data } = await axios.post(`/books`, {
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function deleteBook(id: number) {
	const { data } = await axios.delete(`/books/${id}`)
	return data
}

export async function uploadBook(id: number, file: any, onUploadProgress: any) {
	const { data } = await axios.post(`/books/${id}`, file, {
		onUploadProgress,
	})
	return data
}
