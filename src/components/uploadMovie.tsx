import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadMovie } from '../services/movies'
import { UploadMovieProps } from '../types/movies.ts'

const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [percent, setPersent] = useState(0)
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		if (isUpload) {
			setPersent(100)
		}
	})

	const videoFraction = () => {
		const url = `${import.meta.env.VITE_API}/movies/fraction/${id}`
		const source = new EventSource(url)

		source.onmessage = event => {
			setPersent(event.data)
			if (+event.data === 100) {
				source.close()
			}
		}
	}

	const uploadFile = async (options: any) => {
		const { file } = options
		const formData = new FormData()
		formData.append('video', file.arrayBuffer())

		try {
			await uploadMovie(id, file)

			messageApi.open({
				type: 'success',
				content: 'Movie is successfully uploaded',
			})
			videoFraction()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: "Couldn't upload movie",
			})
		}
	}

	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<Upload name='file' customRequest={uploadFile} showUploadList={false}>
					<Button icon={<UploadOutlined />} disabled={uploadDisabled}>
						Click to upload movie
					</Button>
				</Upload>
				<Progress type='circle' percent={percent} />
			</Flex>
		</>
	)
}

export default UploadMovie
