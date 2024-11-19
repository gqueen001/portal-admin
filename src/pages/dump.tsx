import { Form, Input, Button, Flex, message } from 'antd'
import { createDump } from '@/services/dump'

const Dump = () => {
	const [messageApi, contextHolder] = message.useMessage()

	const onFinish = async (value: { dump: string }) => {
		try {
			await createDump(value)
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Couldn`t dump',
			})
		}
	}
	return (
		<>
			{contextHolder}
			<Flex style={{ width: '100%', height: '100vh' }} justify='center' align='center'>
				<Form name='basic' style={{ width: 600 }} onFinish={onFinish}>
					<Form.Item name='dump' rules={[{ required: true, message: 'Please input!' }]}>
						<Input placeholder='/dev/sdb1 or E:' />
					</Form.Item>
					<Flex justify='end'>
						<Form.Item label={null}>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
					</Flex>
				</Form>
			</Flex>
		</>
	)
}

export default Dump
