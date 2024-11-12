import { FloatButton, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableColumns } from '../../types/table'
import { getMusics } from '../../services/musics.ts'
import Actions from '../../components/actions'
import DeleteModal from '../../components/modal/deleteModal'
import { TitleOfMovie, TitleOfMovies, MoviesType } from '../../types/movies/movies'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { MusicsType, Music, MusicsRow } from '../../types/musics/musics.ts'

const Musics = () => {
	const [dataRows, setDataRows] = useState<MusicsRow>()
	const [messageApi, contextHolder] = message.useMessage()
	const [movieId, setMovieId] = useState<string>('new')
	const [openEditPage, setOpenEditPage] = useState<boolean>(false)
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [deleteRowId, setDeleteRowId] = useState<string | null>(' ')
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (!openDeleteModal) {
	// 		setDeleteRowId(movieId)
	// 		setTimeout(() => {
	// 			setDataRows(prevData => prevData?.filter(item => item.key !== movieId))
	// 			setDeleteRowId(null)
	// 		}, 500)
	// 	}
	// }, [openDeleteModal])

	console.log('it is row', dataRows)

	useEffect(() => {
		const fetchMusics = async () => {
			try {
				const musicsTitle: MusicsType = await getMusics()
				console.log('it is musics', musicsTitle.musics)

				setDataRows(
					musicsTitle.musics.map(music => ({
						key: `${music.id}`,
						titleRu: music.title.ru,
						titleTk: music.title.tk,
					}))
				)
				// setDataRows(musicsTitle.musics)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't fetch",
				})
			}
		}

		fetchMusics()
	}, [])

	useEffect(() => {
		if (openEditPage) {
			navigate(`/music/${movieId}`)
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
				// rowClassName={(record: TitleOfMovie) =>
				// 	record.key === deleteRowId ? 'fade-row fade-exit' : 'fade-row'
				// }
				onRow={(record: TitleOfMovie) => {
					return {
						onClick: () => {
							setMovieId(record.key)
						},
					}
				}}
			/>

			{/* <FloatButton
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => {
					navigate(`/movie/${movieId}`)
				}}
			/> */}

			{/* <DeleteModal
				isOpen={openDeleteModal}
				setCloseModal={setOpenDeleteModal}
				deleteId={movieId}
				item='movie'
			/> */}
		</>
	)
}

export default Musics
