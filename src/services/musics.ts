import axios from '@/plugins/axios'
import { DataOfMusAndBooks } from '@/types/musicsAndBook'

export async function getMusics() {
	const { data } = await axios(`/musics/admin`)
	return data
}

export async function getMusicById(id: number) {
	const { data } = await axios(`/musics/${id}`)
	return data
}

export async function updateMusicById(value: DataOfMusAndBooks, id: number) {
	const { data } = await axios.put(`/musics`, {
		id,
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function createNewMusic(value: DataOfMusAndBooks) {
	const { data } = await axios.post(`/musics`, {
		title: {
			ru: value.titleRu,
			tk: value.titleTk,
		},
	})
	return data
}

export async function deleteMusic(id: number) {
	const { data } = await axios.delete(`/musics/${id}`)
	return data
}
