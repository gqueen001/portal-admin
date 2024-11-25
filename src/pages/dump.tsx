import { Form, Input, Button, Flex, message } from 'antd'
import { createDump } from '@/services/dump'
import { useState } from 'react'
import DumpLoader from '@/components/dumpLoader'

const Dump = () => {
	const [messageApi, contextHolder] = message.useMessage()
	const [loading, setLoading] = useState<boolean>(false)

	const onFinish = async (value: { dump: string }) => {
		try {
			setLoading(true)
			const res = await createDump(value)
			if (res.status === 201) {
				setLoading(false)
			}
			messageApi.open({
				type: 'success',
				content: 'Successfully dumped',
			})
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
			{loading && <DumpLoader loading={loading} />}
			<DumpLoader loading={loading} />
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
