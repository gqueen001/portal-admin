import {
	Button,
	Checkbox,
	ConfigProvider,
	Divider,
	Flex,
	Form,
	Input,
	Select,
	TimePicker,
	type ThemeConfig,
	message,
} from 'antd'
import { useEffect, useState } from 'react'
import { DataOfMovie } from '../types/editMovie'

import { convertToSeconds, convertToHour } from '../utils/converter'
import UploadImg from '../components/uploadImg'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../services/movies'
import { Movie, TkAndRu } from '../types/movies'
// import { convertToHour } from '../utils/converter'
import dayjs from 'dayjs'
import { getCategories } from '../services/categories/movie'
import { Categories } from '../types/categories/movie'
import Title from 'antd/es/skeleton/Title'
// import { TkAndRu } from '../types/movies'
// import Categories

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
	const [form] = Form.useForm()
	// const arr: string[] = ['.com', '.jp', '.cn', '.org']
	// const selectOptions = arr.map(val => ({ value: val, label: val, name: 'category' }))
	let { id } = useParams()
	const [messageApi, contextHolder] = message.useMessage()
	const [categories, setCategories] = useState<TkAndRu[]>([{ tk: '', ru: '' }])

	useEffect(() => {
		if (id && id !== 'new') {
			const fetchMovieById = async () => {
				try {
					const movie: Movie = await getMovieById(+id)
					// console.log('movie', movie)
					setData({
						titleRu: movie.title.ru,
						titleTk: movie.title.tk,
						categoryRu: movie.sub_categories.map(category => {
							return category.title.ru
						}),
						categoryTk: movie.sub_categories.map(category => {
							return category.title.tk
						}),
						duration: `${movie.duration}`,
						descriptionRu: movie.description.ru,
						descriptionTk: movie.description.tk,
						status: movie.status,
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't fetch data",
					})
				}
			}

			fetchMovieById()
		} else {
			console.log('it is new id', id)
		}
	}, [id])

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				titleTk: data.titleTk,
				titleRu: data.titleRu,
				descriptionRu: data.descriptionRu,
				descriptionTk: data.descriptionTk,
				duration: dayjs(convertToHour(data.duration), 'HH:mm:ss'),
				status: data.status,
				categoryTk: data.categoryTk,
				categoryRu: data.categoryRu,
			})
		}
	}, [data])

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const categories: Categories = await getCategories()
				setCategories(categories.map(category => category.title))
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't fetch data",
				})
			}
		}

		fetchCategory()
	}, [id])

	const selectCategoryTk = categories.map(categoryTk => ({
		value: categoryTk.tk,
		label: categoryTk.tk,
		name: 'categoryTk',
	}))

	const selectCategoryRu = categories.map(categoryRu => ({
		value: categoryRu.ru,
		label: categoryRu.ru,
		name: 'categoryRu',
	}))

	const onFinish = (value: DataOfMovie) => {
		setData({
			titleTk: value.titleTk,
			titleRu: value.titleRu,
			descriptionTk: value.descriptionTk,
			descriptionRu: value.descriptionRu,
			duration: convertToSeconds(value.duration),
			status: value.status,
			categoryTk: value.categoryTk,
			categoryRu: value.categoryRu,
		})

		messageApi.open({
			type: 'success',
			content: 'Success data',
		})
	}

	return (
		<>
			{contextHolder}
			<ConfigProvider theme={theme}>
				<div style={{ width: '30%' }}>
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
							<Flex justify='space-between'>
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
							}}
						>
							<Divider>Categories</Divider>
							<Flex justify='space-between'>
								<Form.Item
									rules={[{ required: true, message: 'Categories are required' }]}
									name={'categoryTk'}
									label='Categories are in turkmen:'
								>
									<Select
										style={{ width: '200px' }}
										// options={selectOptions}
										options={selectCategoryTk}
										placeholder='Choose categories'
										mode='multiple'
									></Select>
								</Form.Item>

								<Form.Item
									rules={[{ required: true, message: 'Categories are required' }]}
									name={'categoryRu'}
									label='Categories are in russian:'
								>
									<Select
										style={{ width: '200px' }}
										options={selectCategoryRu}
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
							}}
						>
							<Divider>Duration and status</Divider>
							<Flex justify='space-between'>
								<Form.Item
									rules={[{ required: true, message: 'Duration is required' }]}
									name={'duration'}
									label='Duration of movie:'
								>
									<TimePicker
										showNow={false}
										onChange={value => convertToSeconds(value)}
									/>
								</Form.Item>
								<Form.Item
									name='status'
									valuePropName='checked'
									initialValue={false}
									label='Status of movie:'
								>
									<Checkbox checked={false}></Checkbox>
								</Form.Item>
							</Flex>
						</div>
						<div
							style={{
								backgroundColor: '#ffffff',
								margin: '0 0 10px 0',
								padding: '0 10px 10px',
								borderRadius: '5px',
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
					<UploadImg></UploadImg>
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMovie
