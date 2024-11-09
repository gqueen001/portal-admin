import axios from 'axios'
import { DataOfMovie } from '../types/editMovie'

export async function getMovieById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies/${id}`)
	return data
}

export async function getMovies() {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies?page=1&count=10`)
	return data
}

export async function updateMovieById(value: DataOfMovie, id: number) {
	// console.log('value:', value, 'id', id)

	const { data } = await axios.put(`${import.meta.env.VITE_API}/movies/${id}`, {
		id,
		description: {
			ru: value.descriptionRu,
			tk: value.descriptionTk,
		},
		duration: value.duration,
		status: value.status,
		sub_categories: value.categoryRu,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})

	return data
}
