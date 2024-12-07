import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadMovie } from '@/services/movies'
import { UploadMovieProps } from '@/types/movies/movies.ts'

const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [percent, setPersent] = useState<number>()
	const [postPercent, setPostPercent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		if (isUpload) {
			setPersent(100)
		}
	}, [isUpload])

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

	const onUploadProgress = (ProgressEvent: { loaded: number; total: number }) => {
		const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
		setPostPercent(progress)
	}

	const uploadFile = async (options: any) => {
		setPersent(0)

		const { file } = options
		// const formData = new FormData()
		// formData.append('video', file.arrayBuffer())

		try {
			await uploadMovie(id, file, onUploadProgress)

			messageApi.success({
				type: 'success',
				content: 'Successfully uploaded',
			})
			videoFraction()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: "Couldn't upload",
			})
		}
	}

	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<div>
					<Upload name='file' customRequest={uploadFile} showUploadList={false}>
						<Button icon={<UploadOutlined />} disabled={uploadDisabled}>
							Click to upload movie
						</Button>
					</Upload>
					<Progress percent={postPercent} size={[200, 10]} />
				</div>
				<Progress type='circle' percent={percent} />
			</Flex>
		</>
	)
}

export default UploadMovie
