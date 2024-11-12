import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableColumns } from '../types/table'
import { getMovies } from '../services/movies.ts'
import Actions from '../components/actions'
import DeleteModal from '../components/modal/deleteModal'
import { TitleOfMovie, TitleOfMovies, MoviesType } from '../types/movies'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const Movies = () => {
	const [dataRows, setDataRows] = useState<TitleOfMovies>()
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
		}
	}, [isDelete])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const moviesTitle: MoviesType = await getMovies()
				setDataRows(
					moviesTitle.map((movie: any) => ({
						key: `${movie.id}`,
						titleTk: movie.title.tk,
						titleRu: movie.title.ru,
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
	}, [])

	useEffect(() => {
		if (openEditPage) {
			navigate(`/movie/${movieId}`)
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
					navigate(`/movie/${movieId}`)
				}}
			/>

			<DeleteModal
				isOpen={openDeleteModal}
				setCloseModal={setOpenDeleteModal}
				deleteId={movieId}
				setDelete={setIsDelete}
				item='movie'
			/>
		</>
	)
}

export default Movies
