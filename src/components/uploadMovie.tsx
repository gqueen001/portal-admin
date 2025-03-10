import { Progress, Upload, Button, Flex, message, UploadProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { UploadMovieProps } from '@/types/movies/movies.ts'
import { updateMovieById } from '@/services/movies'

const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled, data }) => {
	const [percent, setPersent] = useState<number>()
	const [postPercent, setPostPercent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()
	const [isDurationSent, setIsDurationSent] = useState(false)

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

	const handleFileChange = (info: any) => {
		const selectedFile = info.file.originFileObj
		const videoElement = document.createElement('video')
		videoElement.src = URL.createObjectURL(selectedFile)
		videoElement.onloadedmetadata = () => {
			const duration = Math.floor(videoElement.duration)

			const sendDuration = async () => {
				if (data) {
					const updatedData = {
						...data,
						categoryTk: data.categoryTk.map(subCat => subCat.value),
					}
					try {
						await updateMovieById(updatedData, id, duration)
						messageApi.open({
							type: 'success',
							content: 'Succeccfully updated',
						})
						setIsDurationSent(true)
					} catch (error) {
						messageApi.open({
							type: 'error',
							content: 'Couldn`t update',
						})
					}
				}
			}

			sendDuration()
		}
	}

	const props: UploadProps = {
		name: 'file',
		action: `${import.meta.env.VITE_API}/movies/${id}`,
		headers: {
			authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		onChange(info) {
			if (info.file.status === 'done' && !isDurationSent) {
				handleFileChange(info)
			}
			setPostPercent(Math.floor(Number(info.file.percent)))

			if (info.file.status === 'done') {
				messageApi.open({
					type: 'success',
					content: 'Successfully uploaded',
				})
				videoFraction()
			} else if (info.file.status === 'error') {
				messageApi.open({
					type: 'error',
					content: "Couldn't upload",
				})
			}
		},
	}

	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<div>
					<Upload {...props} showUploadList={false}>
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
