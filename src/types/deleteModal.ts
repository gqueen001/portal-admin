export interface DeleteModalProps {
	isOpen: boolean
	setCloseModal: (value: boolean) => void
	deleteId: string
	item: string
}
