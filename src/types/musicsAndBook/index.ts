export type MusAndBook = {
	id: number
	path: string
	title: {
		ru: string
		tk: string
	}
}

export type MusAndBooksType = MusAndBook[]

type MusAndBookRow = {
	key: string
	titleRu: string
	titleTk: string
}

export type MusAndBooksRow = MusAndBookRow[]

export type DataOfMusAndBooks = {
	id: string
	titleTk: string
	titleRu: string
}
