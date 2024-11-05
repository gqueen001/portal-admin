import { Dayjs } from 'dayjs'

export type DataOfMovie = {
	titletk: string
	titleru: string
	category: string
	duration: Dayjs | null
	descriptiontk: string
	descriptionru: string
	status: boolean
}
