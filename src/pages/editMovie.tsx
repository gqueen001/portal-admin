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
} from 'antd'
import { useEffect, useState } from 'react'
import { DataOfMovie } from '../types/example'
import { convertToSeconds } from '../utils/converter'
import UploadImg from '../components/uploadImg'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../services/movies'
import { Movie } from '../types/movies'
import { convertToHour } from '../utils/converter'
import dayjs from 'dayjs'

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
	const arr: string[] = ['.com', '.jp', '.cn', '.org']
	const selectOptions = arr.map(val => ({ value: val, label: val, name: 'category' }))
	let { id } = useParams()

	// console.log('id', id)

	useEffect(() => {
		if (id && id !== 'new') {
			const fetchMovieById = async () => {
				try {
					const movie: Movie = await getMovieById(+id)
					// console.log('movie', movie)
					setData({
						titleru: movie.title.ru,
						titletk: movie.title.tk,
						categoryRu: movie.sub_categories.map(category => {
							return category.title.ru
						}),
						categoryTk: movie.sub_categories.map(category => {
							return category.title.tk
						}),
						duration: `${movie.duration}`,
						descriptionru: movie.description.ru,
						descriptiontk: movie.description.tk,
						status: movie.status,
					})
				} catch (error) {
					console.log('it is error', error)
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
				titletk: data.titletk,
				titleru: data.titleru,
				descriptionru: data.descriptionru,
				descriptiontk: data.descriptiontk,
				duration: dayjs(convertToHour(data.duration), 'HH:mm:ss'),
				status: data.status,
				categoryTk: data.categoryTk,
				categoryRu: data.categoryRu,
			})
		}
	}, [data])

	const onFinish = (value: DataOfMovie) => {
		setData({
			titletk: value.titletk,
			titleru: value.titleru,
			descriptiontk: value.descriptiontk,
			descriptionru: value.descriptionru,
			duration: convertToSeconds(value.duration),
			status: value.status,
			categoryTk: value.categoryTk,
			categoryRu: value.categoryRu,
		})
	}

	return (
		<>
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
									name={'titletk'}
								>
									<Input
										allowClear
										placeholder='Enter title of movie'
										name='titletk'
									/>
								</Form.Item>
								<Form.Item
									rules={[
										{ required: true, message: 'Title in russion is required' },
									]}
									label='Title in russion:'
									name={'titleru'}
								>
									<Input
										allowClear
										placeholder='Enter title of movie'
										name='titleru'
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
										options={selectOptions}
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
										options={selectOptions}
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
									name={'descriptiontk'}
									label='Description in turkmen:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptiontk'
									/>
								</Form.Item>
								<Form.Item
									rules={[
										{
											required: true,
											message: 'Description in russion is required',
										},
									]}
									name={'descriptionru'}
									label='Description in russion:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptionru'
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
					{/* <Upload></Upload> */}
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMovie
// function moment(arg0: string): any {
// 	throw new Error('Function not implemented.')
// }
