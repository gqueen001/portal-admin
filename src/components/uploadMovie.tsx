import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadMovie } from '../services/movies'
import { UploadMovieProps } from '../types/movies/movies.ts'
import { UploadFile } from 'antd/es/upload/interface'

type uploading = {
	uid: string
	name: string
	status: string
}
const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [percent, setPersent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()
	const [fileList, setFileList] = useState<UploadFile<any>[]>([])

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

	const uploadFile = async (options: any) => {
		setPersent(0)

		const { file } = options
		const formData = new FormData()
		formData.append('video', file.arrayBuffer())

		console.log('it is work', file)

		// const { file, onSuccess, onError } = options

		// try {
		// 	setFileList([{ uid: file.uid, name: file.name, status: 'uploading' }])

		// 	await new Promise(resolve => setTimeout(resolve, 1000))

		// 	setFileList([{ uid: file.uid, name: file.name, status: 'done' }])
		// 	// onSuccess('ok')
		// } catch (error) {
		// 	setFileList([{ uid: file.uid, name: file.name, status: 'error' }])
		// 	// onError(error)
		// }
		try {
			await uploadMovie(id, file)

			messageApi.open({
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

	// const uploadingFile = async (options: any) => {}

	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<Upload
					name='file'
					customRequest={uploadFile}
					showUploadList={false}
					// customRequest={uploadingFile}
					// fileList={fileList}
				>
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
