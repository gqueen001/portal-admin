import { Category } from '../categories/movie'

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
	sub_categories: Category[]
	title: TkAndRu
	is_uploaded: boolean
}

export type TkAndRu = {
	tk: string
	ru: string
}

export type MoviesType = Movie[]

export interface UploadMovieProps {
	id: number
	isUpload: boolean
	uploadDisabled: boolean
}

export interface UploadImgProps {
	imageURL: string
	id: number
	setUpdateImage: (value: boolean) => void
	uploadDisabled: boolean
}
