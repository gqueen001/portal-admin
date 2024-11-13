export type Music = {
	id: number
	path: string
	title: {
		ru: string
		tk: string
	}
}

export type MusicsType = Music[]

type MusicRow = {
	key: string
	titleRu: string
	titleTk: string
}

export type MusicsRow = MusicRow[]

export type DataOfMusic = {
	id: string
	titleTk: string
	titleRu: string
}
