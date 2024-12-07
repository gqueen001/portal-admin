import { Progress, Upload, Button, Flex, message, UploadProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { UploadMovieProps } from '@/types/movies/movies.ts'

const UploadBook: FC<UploadMovieProps> = ({ id, isUpload, uploadDisabled, setIsPathUploaded }) => {
	const [postPercent, setPostPercent] = useState<number>()
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		if (isUpload) {
			setPostPercent(100)
		}
	}, [isUpload])

	const props: UploadProps = {
		name: 'file',
		action: `${import.meta.env.VITE_API}/books/${id}`,
		headers: {
			authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		onChange(info) {
			if (info.file.status === 'done') {
				messageApi.open({
					type: 'success',
					content: 'Successfully uploaded',
				})
				setIsPathUploaded?.(true)
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
				<Upload {...props} showUploadList={false}>
					<Button icon={<UploadOutlined />} disabled={uploadDisabled}>
						Click to upload movie
					</Button>
				</Upload>
				<Progress type='circle' percent={postPercent} />
			</Flex>
		</>
	)
}

export default UploadBook
