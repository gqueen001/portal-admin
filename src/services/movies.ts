import axios from '@/plugins/axios'
import { DataOfMovie } from '@/types/movies/editMovie'

export async function getMovieById(id: number) {
	const { data } = await axios(`/movies/${id}`)
	return data
}

export async function getMovies() {
	const { data } = await axios(`/movies/admin`)
	return data
}

export async function updateMovieById(value: any, id: number, duration: number) {
	const { data } = await axios.put(`/movies`, {
		id,
		description: {
			ru: value.descriptionRu,
			tk: value.descriptionTk,
		},
		duration: duration,
		sub_categories: value.categoryTk,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})

	return data
}

export async function createNewMovie(value: DataOfMovie, duration: number) {
	const { data } = await axios.post(`/movies`, {
		title: {
			tk: value.titleTk,
			ru: value.titleRu,
		},
		description: {
			tk: value.descriptionTk,
			ru: value.descriptionRu,
		},
		duration: duration,
		sub_categories: value.categoryTk,
	})

	return data
}

export async function deleteMovie(id: number) {
	const { data } = await axios.delete(`/movies/${id}`)
	return data
}
