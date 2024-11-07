import axios from 'axios'

export async function getMovieById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies/${id}`)
	return data
}

export async function getMovies() {
	const { data } = await axios(`${import.meta.env.VITE_API}/movies?page=1&count=10`)
	return data
}
