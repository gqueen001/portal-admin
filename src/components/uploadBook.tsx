import { Progress, Upload, Button, Flex, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { UploadMovieProps } from '@/types/movies/movies.ts'
import { UploadFile } from 'antd/es/upload/interface'
import { uploadBook } from '@/services/books.ts'

const UploadBook: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled }) => {
	const [percent, setPersent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()
	const [fileList, setFileList] = useState<UploadFile<any>[]>([])

	useEffect(() => {
		if (isUpload) {
			setPersent(100)
		}
	}, [isUpload])

	const uploadFile = async (options: any) => {
		setPersent(0)

		const { file } = options
		const formData = new FormData()
		formData.append('book', file.arrayBuffer())

		try {
			await uploadBook(id, file)

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

export default UploadBook
