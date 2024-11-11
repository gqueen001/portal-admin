export type Music = {
	id: number
	// path: string
	title: {
		ru: string
		tk: string
	}
}

export type MusicsType = {
	musics: Music[]
}

type MusicRow = {
	key: string
	titleRu: string
	titleTk: string
}

export type MusicsRow = MusicRow[]
