import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableColumns, TableRows, TableRow } from '../../types/table'
import { Categories } from '../../types/categories/movie'
import { getCategories } from '../../services/categories/movie.ts'
import Actions from '../../components/actions'
import OpenModal from '../../components/modal/openModal'
import DeleteModal from '../../components/modal/deleteModal'

const MovieCategories = () => {
	const [dataRows, setDataRows] = useState<TableRows>()
	const [messageApi, contextHolder] = message.useMessage()
	const [openEditModal, setOpenEditModal] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<string>('')
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [deleteRowId, setDeleteRowId] = useState<string | null>('')
	const [isDelete, setIsDelete] = useState<boolean>(false)

	useEffect(() => {
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
	}, [openEditModal])

	useEffect(() => {
		if (isDelete) {
			setDeleteRowId(categoryId)

			setTimeout(() => {
				setDataRows(prevData => prevData?.filter(item => item.key !== categoryId))
				setDeleteRowId(null)
			}, 500)
			setIsDelete(false)
		}
	}, [isDelete])

	const columns: TableColumns = [
		{
			title: 'ID',
			dataIndex: 'key',
			key: 'key',
			align: 'center',
		},
		{
			title: 'Title in turkmen',
			dataIndex: 'titleTk',
			key: 'titleTk',
			align: 'center',
		},
		{
			title: 'Title in russsion',
			dataIndex: 'titleRu',
			key: 'titleRu',
			align: 'center',
		},
		{
			title: 'action',
			key: 'action',
			align: 'center',
			render: () => (
				<Actions setOpenModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} />
			),
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
				rowClassName={(record: TableRow) =>
					record.key === deleteRowId ? 'fade-row fade-exit' : 'fade-row'
				}
				onRow={(record: TableRow) => {
					return {
						onClick: () => setCategoryId(record.key),
					}
				}}
			/>

			<FloatButton
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => {
					setOpenEditModal(true)
					setCategoryId('new')
				}}
			/>

			<OpenModal
				isOpen={openEditModal}
				setCloseModal={setOpenEditModal}
				categoryId={categoryId}
			/>

			<DeleteModal
				isOpen={openDeleteModal}
				setCloseModal={setOpenDeleteModal}
				deleteId={categoryId}
				setDelete={setIsDelete}
				item='category'
			/>
		</>
	)
}

export default MovieCategories
