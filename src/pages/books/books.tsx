import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { TableColumns } from '@/types/table'
import Actions from '@/components/actions'
import DeleteModal from '@/components/modal/deleteModal'
import { TitleOfMovie } from '@/types/movies/movies'
import { MusicsType, MusicsRow } from '@/types/musics/musics.ts'
import { getBooks } from '@/services/books.ts'
import '@/index.css'

const Musics = () => {
	const [dataRows, setDataRows] = useState<MusicsRow>()
	const [messageApi, contextHolder] = message.useMessage()
	const [movieId, setMovieId] = useState<string>('new')
	const [openEditPage, setOpenEditPage] = useState<boolean>(false)
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [deleteRowId, setDeleteRowId] = useState<string | null>(' ')
	const [isDelete, setIsDelete] = useState<boolean>(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (isDelete) {
			setDeleteRowId(movieId)
			setTimeout(() => {
				setDataRows(prevData => prevData?.filter(item => item.key !== movieId))
				setDeleteRowId(null)
			}, 500)
			setIsDelete(false)
		}
	}, [isDelete])

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const musicsTitle: MusicsType = await getBooks()

				setDataRows(
					musicsTitle.map(music => ({
						key: `${music.id}`,
						titleRu: music.title.ru,
						titleTk: music.title.tk,
					}))
				)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't fetch",
				})
			}
		}

		fetchBooks()
	}, [])

	useEffect(() => {
		if (openEditPage) {
			navigate(`/book/${movieId}`)
		}
	}, [openEditPage])

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
			title: 'Title in russian',
			dataIndex: 'titleRu',
			key: 'titleRu',
			align: 'center',
		},
		{
			title: 'action',
			key: 'action',
			align: 'center',
			render: () => (
				<Actions setOpenModal={setOpenEditPage} setOpenDeleteModal={setOpenDeleteModal} />
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
				rowClassName={(record: TitleOfMovie) =>
					record.key === deleteRowId ? 'fade-row fade-exit' : 'fade-row'
				}
				onRow={(record: TitleOfMovie) => {
					return {
						onClick: () => {
							setMovieId(record.key)
						},
					}
				}}
			/>

			<FloatButton
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => {
					navigate(`/book/${movieId}`)
				}}
			/>

			<DeleteModal
				isOpen={openDeleteModal}
				setCloseModal={setOpenDeleteModal}
				deleteId={movieId}
				setDelete={setIsDelete}
				item='book'
			/>
		</>
	)
}

export default Musics
