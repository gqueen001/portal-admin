import { Category } from './categories/movie'

export type TitleOfMovie = {
	key: string
	titleTk: string
	titleRu: string
}

export type TitleOfMovies = TitleOfMovie[]

export type Movie = {
	description: TkAndRu
	duration: number
	id: number
	image: string
	status: boolean
	sub_categories: Category[]
	title: TkAndRu
}

export type TkAndRu = {
	tk: string
	ru: string
}

export type MoviesType = Movie[]
