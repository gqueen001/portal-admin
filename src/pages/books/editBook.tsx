import { Button, ConfigProvider, Divider, Flex, Form, Input, type ThemeConfig, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadMusic from '../../components/uploadMusic'
import { Music, DataOfMusic } from '../../types/musics/musics'
import { getMusicById, updateMusicById, createNewMusic } from '../../services/musics'
import { getBookById, updateBookById, createNewBook } from '../../services/books'
// import { UploadBook } from '../../services/books'
import UploadBook from '../../components/uploadBook'

const EditMusic = () => {
	const { TextArea } = Input
	const theme: ThemeConfig = {
		components: {
			Form: {
				marginLG: 10,
			},
		},
	}

	const [data, setData] = useState<DataOfMusic>()
	const [messageApi, contextHolder] = message.useMessage()
	const [updateImage, setUpdateImage] = useState(false)
	const [isUpload, setIsUpload] = useState<boolean>(false)
	const [uploadDisabled, setUploadDisabled] = useState<boolean>(true)
	const [form] = Form.useForm()
	let { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (id && id !== 'new') {
			const fetchBookById = async () => {
				try {
					const book: Music = await getBookById(+id)
					console.log('it is music', book)

					setData({
						id: `${book.id}`,
						titleRu: book.title.ru,
						titleTk: book.title.tk,
					})

					setIsUpload(book.path !== null)
					// setUpdateImage(false)
					setUploadDisabled(false)
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't fetch",
					})
				}
			}

			fetchBookById()
		}
	}, [id, updateImage])

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				titleTk: data.titleTk,
				titleRu: data.titleRu,
			})
		}
	}, [data])

	const onFinish = async (value: DataOfMusic) => {
		console.log('it is value', value)

		if (id && id !== 'new') {
			try {
				await updateBookById(value, +id)
				messageApi.open({
					type: 'success',
					content: 'Succeccfully updated',
				})
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Couldn`t update',
				})
			}
		} else {
			try {
				const newId: { id: number } = await createNewBook(value)
				messageApi.open({
					type: 'success',
					content: 'Succeccfully created',
				})
				navigate(`/book/${newId.id}`)
				setUploadDisabled(false)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Couldn`t create',
				})
			}
		}
	}

	return (
		<>
			{contextHolder}
			<ConfigProvider theme={theme}>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
					}}
				>
					<Form layout='vertical' onFinish={onFinish} form={form}>
						<div
							style={{
								backgroundColor: '#ffffff',
								margin: '0 0 10px 0',
								padding: '0 10px 10px',
								borderRadius: '5px',
							}}
						>
							<Divider>Title</Divider>
							<Flex justify='space-between' gap={20}>
								<Form.Item
									rules={[
										{ required: true, message: 'Title in turkmen is required' },
									]}
									label='Title in turkmen:'
									name={'titleTk'}
								>
									<Input
										allowClear
										placeholder='Enter title of movie'
										name='titleTk'
									/>
								</Form.Item>
								<Form.Item
									rules={[
										{ required: true, message: 'Title in russian is required' },
									]}
									label='Title in russian:'
									name={'titleRu'}
								>
									<Input
										allowClear
										placeholder='Enter title of movie'
										name='titleRu'
									/>
								</Form.Item>
							</Flex>
						</div>

						<Flex gap={'10px'} justify='flex-end'>
							<Form.Item>
								<Button type='primary' htmlType='submit'>
									Submit
								</Button>
							</Form.Item>

							<Form.Item>
								<Button
									onClick={() => {
										form.resetFields()
									}}
								>
									Reset
								</Button>
							</Form.Item>
						</Flex>
					</Form>
					<UploadBook
						id={Number(id)}
						isUpload={isUpload}
						uploadDisabled={uploadDisabled}
					></UploadBook>
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMusic
