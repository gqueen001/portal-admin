export type DataOfMovie = {
	titleTk: string
	titleRu: string
	categoryTk: Category[]
	duration: string
	descriptionTk: string
	descriptionRu: string
	status: boolean
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
