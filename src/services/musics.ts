import axios from '@/plugins/axios'
import { DataOfMusic } from '@/types/musics/musics'

export async function getMusics() {
	const { data } = await axios(`/musics/admin`)
	return data
}

export async function getMusicById(id: number) {
	const { data } = await axios(`/musics/${id}`)
	return data
}

export async function updateMusicById(value: DataOfMusic, id: number) {
	const { data } = await axios.put(`/musics`, {
		id,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function createNewMusic(value: DataOfMusic) {
	const { data } = await axios.post(`/musics`, {
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function uploadMusic(id: number, file: any) {
	const { data } = await axios.post(`/musics/${id}`, file)
	return data
}

export async function deleteMusic(id: number) {
	const { data } = await axios.delete(`/musics/${id}`)
	return data
}
