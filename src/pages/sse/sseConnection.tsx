import { useEffect, useState } from 'react'
import { Result } from 'antd'
import {
	FrownTwoTone,
	CloseCircleOutlined,
	CheckCircleTwoTone,
	UsbTwoTone
} from '@ant-design/icons'

type TSse = {
	status: string
	value: string
}

const SseConnection = () => {
	const [sse, setSse] = useState<TSse>()

	const resultIcons: { [key: string]: JSX.Element } = {
		empty: <FrownTwoTone />,
		on_progress: <UsbTwoTone />,
		error: <CloseCircleOutlined />,
		success: <CheckCircleTwoTone />
	}

	useEffect(() => {
		const eventSource = new EventSource(
			`${import.meta.env.VITE_API}/v1/media/transfer/progress`
		)

		eventSource.onmessage = event => {
			const response = JSON.parse(event.data)
			console.log('status', response)

			setSse({ status: `${response.status}`, value: `${response.message}` })
		}

		return () => {
			eventSource.close()
		}
	}, [])

	return (
		<>
			<div style={{ width: '100%', textAlign: 'center' }}>
				<Result
					status={sse?.status === 'error' ? 'error' : 'success'}
					subTitle={sse?.value}
					icon={resultIcons[sse?.status as keyof typeof resultIcons]}
				></Result>
			</div>
		</>
	)
}

export default SseConnection
