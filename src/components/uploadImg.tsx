import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Upload, Button, Image, message, Flex } from 'antd'
import { FC, useState } from 'react'
import axios from 'axios'
import { UploadImgProps } from '../types/uploadImg'

const UploadImg: FC<UploadImgProps> = ({ imageURL, id, setUpdateImage }) => {
	const [messageApi, contextHolder] = message.useMessage()

	const [timestamp, setTimestamp] = useState(Date.now())

	const uploadFile = async (options: any) => {
		const { file } = options
		const formData = new FormData()
		formData.append('file', file.arrayBuffer())

		try {
			await axios.post(`${import.meta.env.VITE_API}/movies/image/${id}`, file)
			setTimestamp(Date.now())
			setUpdateImage(true)

			messageApi.open({
				type: 'success',
				content: 'Success data',
			})
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: "Couldn't fetch data",
			})
		}
	}
	// style={{
	// 	display: 'flex',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	gap: '80px',
	// }}
	return (
		<>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={80}>
				<ImgCrop rotationSlider>
					<Upload name='file' customRequest={uploadFile} showUploadList={false}>
						<Button icon={<UploadOutlined />}>Click to upload image</Button>
					</Upload>
				</ImgCrop>
				<Image
					height={200}
					width={200}
					src={
						`${imageURL}`
							? `${import.meta.env.VITE_API}${imageURL}?t=${timestamp}`
							: 'error'
					}
				/>
			</Flex>
		</>
	)
}

export default UploadImg
