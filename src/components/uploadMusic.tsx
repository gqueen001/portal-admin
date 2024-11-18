import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadMusic } from '@/services/musics'
import { UploadMovieProps } from '@/types/movies/movies.ts'

const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [postPercent, setPostPercent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		if (isUpload) {
			setPostPercent(100)
		}
	}, [isUpload])

	const onUploadProgress = (ProgressEvent: { loaded: number; total: number }) => {
		const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
		setPostPercent(progress)
	}

	const uploadFile = async (options: any) => {
		setPostPercent(0)

		const { file } = options
		const formData = new FormData()
		formData.append('music', file.arrayBuffer())

		try {
			await uploadMusic(id, file, onUploadProgress)

			messageApi.open({
				type: 'success',
				content: 'Successfully uploaded',
			})
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
				<Upload name='file' customRequest={uploadFile} showUploadList={false}>
					<Button icon={<UploadOutlined />} disabled={uploadDisabled}>
						Click to upload song
					</Button>
				</Upload>
				<Progress type='circle' percent={postPercent} />
			</Flex>
		</>
	)
}

export default UploadMovie
