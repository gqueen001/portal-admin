import { useEffect } from 'react'
import { message } from 'antd'
import { sseConnection } from '@/services/sseConnection'
import { Sseconnection } from '@/types'

const SseConnection = () => {
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		const fetchSseConnection = async () => {
			try {
				const response: Sseconnection = await sseConnection()
				messageApi.open({
					type: 'success',
					content: response.message,
				})
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Something went wrong',
				})
			}
		}

		fetchSseConnection()
	})
	return <>{contextHolder}</>
}

export default SseConnection
