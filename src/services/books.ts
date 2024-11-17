import axios from 'axios'
import { DataOfMusic } from '../types/musics/musics'
import { useNavigate } from 'react-router-dom'
// const navigate = useNavigate()

const token = localStorage.getItem('token')
// const config = {
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	},
// }

export async function getBooks() {
	const { data } = await axios(`${import.meta.env.VITE_API}/books/admin`)
	// data.then((response: { data: any }) => {
	// 	console.log(response.data)
	// })
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

export async function createNewBook(value: DataOfMusic) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/books`, {
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function deleteBook(id: number) {
	const { data } = await axios.delete(`${import.meta.env.VITE_API}/musics/${id}`)
	return data
}

export async function uploadBook(id: number, file: any) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/books/${id}`, file)
	return data
}
