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

const Example = () => {
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

	// useEffect(() => {
	// 	if (data) {
	// 		form.setFieldsValue({
	// 			titletk: data.titletk,
	// 			titleru: data.titleru,
	// 			descriptionru: data.descriptionru,
	// 			descriptiontk: data.descriptiontk,
	// 			duration: data.duration,
	// 			status: data.status,
	// 			category: data.category,
	// 		})
	// 	}
	// }, [data])

	const onFinish = (value: DataOfMovie) => {
		setData({
			titletk: value.titletk,
			titleru: value.titleru,
			descriptiontk: value.descriptiontk,
			descriptionru: value.descriptionru,
			duration: convertToSeconds(value.duration),
			status: value.status,
			category: value.category,
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
									rules={[{ required: true }]}
									label='Title in Turkmen:'
									name={'titletk'}
								>
									<Input
										allowClear
										placeholder='Enter title of movie'
										name='titletk'
									/>
								</Form.Item>
								<Form.Item
									rules={[{ required: true }]}
									label='Title in Russion:'
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

						<Flex justify='space-between'>
							<Form.Item rules={[{ required: true }]} name={'category'}>
								<Select
									style={{ width: '200px' }}
									options={selectOptions}
									placeholder='Choose categories'
								></Select>
							</Form.Item>

							<Form.Item rules={[{ required: true }]} name={'duration'}>
								<TimePicker
									showNow={false}
									onChange={value => convertToSeconds(value)}
								/>
							</Form.Item>
						</Flex>
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
									rules={[{ required: true }]}
									name={'descriptiontk'}
									label='Description in Turkmen:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptiontk'
									/>
								</Form.Item>
								<Form.Item
									rules={[{ required: true }]}
									name={'descriptionru'}
									label='Description in Russion:'
								>
									<TextArea
										rows={5}
										placeholder='Write a description about movie'
										name='descriptionru'
									/>
								</Form.Item>
							</Flex>
						</div>

						<Form.Item name='status' valuePropName='checked'>
							<Checkbox>Status</Checkbox>
						</Form.Item>

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
				</div>
			</ConfigProvider>
		</>
	)
}

export default Example
