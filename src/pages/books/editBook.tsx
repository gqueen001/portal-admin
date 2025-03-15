import { Button, ConfigProvider, Divider, Flex, Form, Input, type ThemeConfig, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MusAndBook, DataOfMusAndBooks } from '@/types/musicsAndBook'
import { getBookById, updateBookById, createNewBook } from '@/services/books'
import UploadBook from '@/components/uploadBook'

const EditMusic = () => {
	const theme: ThemeConfig = {
		components: {
			Form: {
				marginLG: 10
			}
		}
	}

	const [data, setData] = useState<DataOfMusAndBooks>()
	const [messageApi, contextHolder] = message.useMessage()
	const [isUpload, setIsUpload] = useState<boolean>(false)
	const [uploadDisabled, setUploadDisabled] = useState<boolean>(true)
	const [isPathUploaded, setIsPathUploaded] = useState<boolean>(false)
	const [form] = Form.useForm()
	let { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (id && id !== 'new') {
			const fetchBookById = async () => {
				try {
					const book: MusAndBook = await getBookById(+id)

					setData({
						id: `${book.id}`,
						titleRu: book.title.ru,
						titleTk: book.title.tk
					})

					setIsUpload(book.path !== null)
					setUploadDisabled(false)
					setIsPathUploaded(false)
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: 'Couldn\'t get'
					})
				}
			}

			fetchBookById()
		}
	}, [id, isPathUploaded])

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				titleTk: data.titleTk,
				titleRu: data.titleRu
			})
		}
	}, [data])

	const onFinish = async (value: DataOfMusAndBooks) => {
		if (id && id !== 'new') {
			try {
				await updateBookById(value, +id)
				messageApi.open({
					type: 'success',
					content: 'Succeccfully updated'
				})
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Couldn`t update'
				})
			}
		} else {
			try {
				const newId: { id: number } = await createNewBook(value)
				messageApi.open({
					type: 'success',
					content: 'Succeccfully created'
				})
				navigate(`/book/${newId.id}`)
				setUploadDisabled(false)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Couldn`t create'
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
						alignItems: 'center'
					}}
				>
					<Form layout="vertical" onFinish={onFinish} form={form}>
						<div
							style={{
								backgroundColor: '#ffffff',
								margin: '0 0 10px 0',
								padding: '0 10px 10px',
								borderRadius: '5px',
								boxShadow: '0px 0px 2px 0px #7a7a7da3'
							}}
						>
							<Divider>Title</Divider>
							<Flex justify="space-between" gap={20}>
								<Form.Item
									rules={[
										{ required: true, message: 'Title in turkmen is required' }
									]}
									label="Title in turkmen:"
									name={'titleTk'}
								>
									<Input
										allowClear
										placeholder="Enter title of movie"
										name="titleTk"
									/>
								</Form.Item>
								<Form.Item
									rules={[
										{ required: true, message: 'Title in russian is required' }
									]}
									label="Title in russian:"
									name={'titleRu'}
								>
									<Input
										allowClear
										placeholder="Enter title of movie"
										name="titleRu"
									/>
								</Form.Item>
							</Flex>
						</div>

						<Flex gap={'10px'} justify="flex-end">
							<Form.Item>
								<Button type="primary" htmlType="submit">
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
						setIsPathUploaded={setIsPathUploaded}
						data={undefined}
					></UploadBook>
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMusic
