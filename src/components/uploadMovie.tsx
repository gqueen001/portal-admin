import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

interface UploadMovieProps {
	id: number
}

const UploadMovie: FC<UploadMovieProps> = ({ id }) => {
	const [percent, setPersent] = useState(0)
	const [messageApi, contextHolder] = message.useMessage()

	const videoFraction = () => {
		const url = `${import.meta.env.VITE_API}/movies/fraction/${id}`
		const source = new EventSource(url)

		source.onmessage = event => {
			console.log(event.data)
			setPersent(event.data)
			if (+event.data === 100) {
				source.close()
			}
		}
	}

	const uploadFile = async (options: any) => {
		// console.log('it is video', file)
		const { file } = options
		const formData = new FormData()
		formData.append('video', file.arrayBuffer())

		try {
			await axios.post(`${import.meta.env.VITE_API}/movies/${id}`, file)
			// setTimestamp(Date.now())
			// setUpdateImage(true)

			messageApi.open({
				type: 'success',
				content: 'Movie is successfully updated',
			})
			videoFraction()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: "Couldn't update movie",
			})
		}
	}

	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<Upload name='file' customRequest={uploadFile} showUploadList={false}>
					<Button icon={<UploadOutlined />}>Click to upload movie</Button>
				</Upload>
				<Progress type='circle' percent={percent} />
			</Flex>
		</>
	)
}
// customRequest={uploadFile}
export default UploadMovie
