import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableColumns, TableRows, TableRow } from '../types/table'
import { Categories } from '../types/categories/movie.ts'
import { getMovies } from '../services/movies.ts'
import Actions from '../components/actions'
import OpenModal from '../components/modal/openModal'
import DeleteModal from '../components/modal/deleteModal'
import { TitleOfMovie } from '../types/movies'
import { TitleOfMovies } from '../types/movies'
import { MoviesType } from '../types/movies'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
	const [dataRows, setDataRows] = useState<TitleOfMovies>()
	const [messageApi, contextHolder] = message.useMessage()
	const [editMovie, setEditMovie] = useState<boolean>(false)
	const [movieId, setMovieId] = useState<string>('new')
	const [openEditPage, setOpenEditPage] = useState<boolean>(false)
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const navigate = useNavigate()
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
			navigate(`/edit/${movieId}`)
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
					// setOpenEditModal(true)
					// setCategoryId('new')
					navigate(`/edit/${movieId}`)
				}}
			/>

			{/* <OpenModal
				isOpen={openEditModal}
				setCloseModal={setOpenEditModal}
				categoryId={categoryId}
			/> */}

			<DeleteModal
				isOpen={openDeleteModal}
				setCloseModal={setOpenDeleteModal}
				deleteId={movieId}
				item='movie'
			/>
		</>
	)
}

export default Movies
