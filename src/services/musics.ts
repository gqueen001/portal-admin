import axios from 'axios'

export async function getMusics() {
	const { data } = await axios(`${import.meta.env.VITE_API}/musics?page=1&count=10`)
	return data
}
