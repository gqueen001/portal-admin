//  action types

export interface ActionProps {
	setOpenModal: (value: boolean) => void
	setOpenDeleteModal: (value: boolean) => void
}

// login types

export type Login = {
	login: string
	password: string
}

// table types

export type TableColumn = {
	key: string
	title: string
	dataIndex?: string
	align: 'left' | 'right' | 'center'
	render?: (record: TableRow) => JSX.Element | undefined
}

export type TableRow = {
	key: string
	titleTk: string
	titleRu: string
}

export type TableColumns = TableColumn[]
export type TableRows = TableRow[]

// SSE-connection types

export type Sseconnection = {
	status: string
	message: string
	error: string
}
