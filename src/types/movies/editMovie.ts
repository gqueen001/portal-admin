export type DataOfMovie = {
	titleTk: string
	titleRu: string
	categoryTk: Category[]
	descriptionTk: string
	descriptionRu: string
	image?: string
}

type Category = {
	value: number
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
