import { Form, Button, Flex, message } from 'antd'
import { createDump } from '@/services/dump'
import { useState } from 'react'
import DumpLoader from '@/components/dumpLoader'

const Dump = () => {
	const [messageApi, contextHolder] = message.useMessage()
	const [loading, setLoading] = useState<boolean>(false)

	const onFinish = async (value: { dump: string }) => {
		setLoading(true)

		try {
			const res = await createDump(value)

			if (res.status === 201) {
				messageApi.success('Successfully dumped')
			} else {
				messageApi.error('Unexpected error occurred during dump')
			}
		} catch (error) {
			messageApi.error('Couldn’t dump')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{contextHolder}
			{loading && <DumpLoader loading={loading} />}
			<Flex style={{ width: '100%', height: '100vh' }} justify="center" align="center">
				<Form name="basic" onFinish={onFinish}>
					<Flex justify="end">
						<Form.Item label={null}>
							<Button type="primary" htmlType="submit" loading={loading}>
								Dump files
							</Button>
						</Form.Item>
					</Flex>
				</Form>
			</Flex>
		</>
	)
}

export default Dump
