import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableColumns, TableRows, TableRow } from '../../types/table'
import { Categories } from '../../types/categories'
import { getCategories } from '../../services/category'
import Actions from '../../components/actions'
import OpenModal from '../../components/modal/modal'

const MovieCategories = () => {
	const [dataRows, setDataRows] = useState<TableRows>()
	const [messageApi, contextHolder] = message.useMessage()
	const [openEditModal, setOpenEditModal] = useState(false)
	const [categoryId, setCategoryId] = useState<string>('')

	useEffect(() => {
		if (!openEditModal) {
			const fetchCategories = async () => {
				try {
					const categories: Categories = await getCategories()

					setDataRows(
						categories.map(category => ({
							key: `${category.id}`,
							titleTk: category.title.tk,
							titleRu: category.title.ru,
						}))
					)
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't fetch data",
					})
				}
			}

			fetchCategories()
		}
	}, [openEditModal])

	const columns: TableColumns = [
		{
			title: 'ID',
			dataIndex: 'key',
			key: 'key',
			align: 'center',
		},
		{
			title: 'Title TK',
			dataIndex: 'titleTk',
			key: 'titleTk',
			align: 'center',
		},
		{
			title: 'Title RU',
			dataIndex: 'titleRu',
			key: 'titleRu',
			align: 'center',
		},
		{
			title: 'action',
			key: 'action',
			align: 'center',
			render: () => <Actions setOpenModal={setOpenEditModal} />,
		},
	]

	return (
		<>
			{contextHolder}
			<Table
				pagination={false}
				columns={columns}
				style={{ width: '100%' }}
				dataSource={dataRows}
				onRow={(record: TableRow) => {
					return {
						onClick: () => setCategoryId(record.key),
					}
				}}
			/>

			<FloatButton type='primary' icon={<PlusOutlined />} onClick={() => {}} />

			<OpenModal
				isOpen={openEditModal}
				setCloseModal={setOpenEditModal}
				categoryById={categoryId}
			/>
		</>
	)
}

export default MovieCategories
