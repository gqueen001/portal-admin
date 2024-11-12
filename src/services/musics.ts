import axios from 'axios'
import { DataOfMusic } from '../types/musics/musics'

export async function getMusics() {
	const { data } = await axios(`${import.meta.env.VITE_API}/musics?page=1&count=10`)
	return data
}

export async function getMusicById(id: number) {
	const { data } = await axios(`${import.meta.env.VITE_API}/musics/${id}`)
	return data
}

export async function updateMusicById(value: DataOfMusic, id: number) {
	const { data } = await axios.put(`${import.meta.env.VITE_API}/musics`, {
		id,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function createNewMusic(value: DataOfMusic) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/musics`, {
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function uploadMusic(id: number, file: any) {
	const { data } = await axios.post(`${import.meta.env.VITE_API}/musics/upload/${id}`, file)
	console.log('it is data', data)

	return data
}
