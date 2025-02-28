import {
	Button,
	ConfigProvider,
	Divider,
	Flex,
	Form,
	Input,
	Select,
	type ThemeConfig,
	message,
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadImg from '@/components/uploadImg'
import { getMovieById, updateMovieById, createNewMovie } from '@/services/movies'
import { getCategories } from '@/services/categories/movie'
import { DataOfMovie, Categories } from '@/types/movies/editMovie'
import { Movie } from '@/types/movies/movies'
import UploadMovie from '@/components/uploadMovie'

const EditMovie = () => {
	const { TextArea } = Input
	const theme: ThemeConfig = {
		components: {
			Form: {
				marginLG: 10,
			},
		},
	}

	const [data, setData] = useState<DataOfMovie>()
	const [messageApi, contextHolder] = message.useMessage()
	const [categories, setCategories] = useState<Categories>([{ id: 0, title: { ru: '', tk: '' } }])
	const [updateImage, setUpdateImage] = useState(false)
	const [isUpload, setIsUpload] = useState<boolean>(false)
	const [uploadDisabled, setUploadDisabled] = useState<boolean>(true)
	const [form] = Form.useForm()
	let { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (id && id !== 'new') {
			const fetchMovieById = async () => {
				try {
					const movie: Movie = await getMovieById(+id)

					setData({
						titleRu: movie.title.ru,
						titleTk: movie.title.tk,
						categoryTk: movie.sub_categories.map(category => {
							return {
								value: category.id,
							}
						}),
						descriptionRu: movie.description.ru,
						descriptionTk: movie.description.tk,
						image: movie.image,
					})

					setIsUpload(movie.is_uploaded)
					setUpdateImage(false)
					setUploadDisabled(false)
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't get",
					})
				}
			}

			fetchMovieById()
		}
		const fetchCategory = async () => {
			try {
				const categories: Categories = await getCategories()
				setCategories(categories)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't get",
				})
			}
		}

		fetchCategory()
	}, [id, updateImage])

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				titleTk: data.titleTk,
				titleRu: data.titleRu,
				descriptionRu: data.descriptionRu,
				descriptionTk: data.descriptionTk,
				categoryTk: data.categoryTk.map(category => category.value),
			})
		}
	}, [data])

	const selectCategoryTk = categories.map(categoryTk => ({
		label: categoryTk.title.tk,
		value: categoryTk.id,
		name: 'categoryTk',
	}))

	const onFinish = async (value: DataOfMovie) => {
		const duration: number = 1
		if (id && id !== 'new') {
			try {
				await updateMovieById(value, +id, duration)
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
				const newId: { id: number } = await createNewMovie(value, duration)

				messageApi.open({
					type: 'success',
					content: 'Succeccfully created',
				})
				navigate(`/movie/${newId.id}`)
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
								boxShadow: '0px 0px 2px 0px #7a7a7da3',
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
						<div
							style={{
								backgroundColor: '#ffffff',
								margin: '0 0 10px 0',
								padding: '0 10px 10px',
								borderRadius: '5px',
								boxShadow: '0px 0px 2px 0px #7a7a7da3',
							}}
						>
							<Divider>Categories</Divider>
							<Flex justify='center'>
								<Form.Item
									rules={[{ required: true, message: 'Categories are required' }]}
									name={'categoryTk'}
									label='Categories are in turkmen:'
								>
									<Select
										style={{ width: '200px' }}
										options={selectCategoryTk}
										placeholder='Choose categories'
										mode='multiple'
									></Select>
								</Form.Item>
							</Flex>
						</div>

						<div
							style={{
								backgroundColor: '#ffffff',
								margin: '0 0 10px 0',
								padding: '0 10px 10px',
								borderRadius: '5px',
								boxShadow: '0px 0px 2px 0px #7a7a7da3',
							}}
						>
							<Divider>Description</Divider>
							<Flex justify='space-between'>
								<Form.Item
									rules={[
										{
											required: true,
											message: 'Description in turkmen is required',
										},
									]}
									name={'descriptionTk'}
									label='Description in turkmen:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptionTk'
									/>
								</Form.Item>
								<Form.Item
									rules={[
										{
											required: true,
											message: 'Description in russian is required',
										},
									]}
									name={'descriptionRu'}
									label='Description in russian:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptionRu'
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
					<Flex vertical gap={150}>
						<UploadImg
							imageURL={data?.image ? data.image : ''}
							id={Number(id)}
							setUpdateImage={setUpdateImage}
							uploadDisabled={uploadDisabled}
						></UploadImg>
						<UploadMovie
							id={Number(id)}
							isUpload={isUpload}
							uploadDisabled={uploadDisabled}
							data={data}
						></UploadMovie>
					</Flex>
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMovie
