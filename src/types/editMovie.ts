export type DataOfMovie = {
	titleTk: string
	titleRu: string
	categoryTk: Category[]
	categoryRu: Category[]
	duration: string
	descriptionTk: string
	descriptionRu: string
	status: boolean
	image?: string
}

type Category = {
	key: number
	title: string
}

export type Categories = [
	{
		id: number
		title: {
			ru: string
			tk: string
		}
	}
]
