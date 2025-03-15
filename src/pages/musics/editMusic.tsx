import { Button, ConfigProvider, Divider, Flex, Form, Input, type ThemeConfig, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadMusic from '@/components/uploadMusic'
import { MusAndBook, DataOfMusAndBooks } from '@/types/musicsAndBook'
import { getMusicById, updateMusicById, createNewMusic } from '@/services/musics'

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
			const fetchMusicById = async () => {
				try {
					const music: MusAndBook = await getMusicById(+id)

					setData({
						id: `${music.id}`,
						titleTk: music.title.tk,
						titleRu: music.title.ru
					})

					setIsUpload(music.path !== null)
					setUploadDisabled(false)
					setIsPathUploaded(false)
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: 'Couldn\'t get'
					})
				}
			}

			fetchMusicById()
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
				await updateMusicById(value, +id)
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
				const newId: { id: number } = await createNewMusic(value)
				messageApi.open({
					type: 'success',
					content: 'Succeccfully created'
				})
				navigate(`/music/${newId.id}`)
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
					<UploadMusic
						id={Number(id)}
						isUpload={isUpload}
						uploadDisabled={uploadDisabled}
						setIsPathUploaded={setIsPathUploaded}
						data={undefined}
					></UploadMusic>
				</div>
			</ConfigProvider>
		</>
	)
}

export default EditMusic
