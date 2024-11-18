import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadMusic } from '@/services/musics'
import { UploadMovieProps } from '@/types/movies/movies.ts'
import { UploadFile } from 'antd/es/upload/interface'

const UploadMovie: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [percent, setPersent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()
	const [fileList, setFileList] = useState<UploadFile<any>[]>([])

	useEffect(() => {
		if (isUpload) {
			setPersent(100)
		}
	}, [isUpload])

	// const onUploadProgress = (progressEvent: any) => {
	// 	const { loaded, total } = progressEvent
	// 	let percent = Math.floor((loaded * 100) / total)
	// 	if (percent < 100) {
	// 		console.log(`${loaded} bytes of ${total} bytes. ${percent}%`)
	// 	}
	// }

	const uploadFile = async (options: any) => {
		setPersent(0)

		const { file } = options
		const formData = new FormData()
		formData.append('music', file.arrayBuffer())

		try {
			await uploadMusic(id, file)

			messageApi.open({
				type: 'success',
				content: 'Successfully uploaded',
			})
		} catch (error) {
			// onUploadProgress: function(progressEvent: { loaded: number; total: number }) {
			// 	var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
			//   }
			// }

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
				<Upload
					name='file'
					customRequest={uploadFile}
					showUploadList={false}
					fileList={fileList}
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
