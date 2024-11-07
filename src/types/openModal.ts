export type CategoryById = {
	titleTk: string
	titleRu: string
}

export interface ModalProps {
	isOpen: boolean
	setCloseModal: (value: boolean) => void
	categoryId: string
}
