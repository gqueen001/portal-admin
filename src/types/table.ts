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
