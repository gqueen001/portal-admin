export type CategoryById = {
	titletk: string
	titleru: string
}

export interface ModalProps {
	isOpen: boolean
	setCloseModal: (value: boolean) => void
	categoryId: string
}
