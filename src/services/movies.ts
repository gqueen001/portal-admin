import axios from 'axios'
import { DataOfMovie } from '../types/movies/editMovie'

export async function getMovieById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies/${id}`)
	return data
}

export async function getMovies() {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies?page=1&count=10`)
	return data
}

export async function updateMovieById(value: DataOfMovie, id: number) {
	const { data } = await axios.put(`${import.meta.env.VITE_API}/movies`, {
		id,
		description: {
			ru: value.descriptionRu,
			tk: value.descriptionTk,
		},
		duration: value.duration,
		status: value.status,
		sub_categories: value.categoryTk,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})

	return data
}

export async function uploadImg(id: number, file: any) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/movies/image/${id}`, file)
	return data
}

export async function uploadMovie(id: number, file: any) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/movies/${id}`, file)
	return data
}

export async function createNewMovie(value: DataOfMovie) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/movies`, {
		title: {
			tk: value.titleTk,
			ru: value.titleRu,
		},
		description: {
			tk: value.descriptionTk,
			ru: value.descriptionRu,
		},
		duration: 3600,
		sub_categories: value.categoryTk,
	})

	return data
}

export async function deleteMovie(id: number) {
	const { data } = await axios.delete(`${import.meta.env.VITE_API}/movies/${id}`)
	return data
}
