import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Upload, Button, Image, message } from 'antd'
import { FC } from 'react'
import axios from 'axios'
import { UploadImgProps } from '../types/uploadImg'

const UploadImg: FC<UploadImgProps> = ({ imageURL, id, setUpdateImage }) => {
	const [messageApi, contextHolder] = message.useMessage()

	const uploadFile = async (options: any) => {
		const { file } = options
		const formData = new FormData()
		formData.append('file', file.arrayBuffer())

		try {
			await axios.post(`${import.meta.env.VITE_API}/movies/image/${id}`, file)
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
	return (
		<>
			{contextHolder}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '80px',
				}}
			>
				<ImgCrop rotationSlider>
					<Upload name='file' customRequest={uploadFile} showUploadList={false}>
						<Button icon={<UploadOutlined />}>Click to upload image</Button>
					</Upload>
				</ImgCrop>
				<Image
					style={{ width: '200px', borderRadius: '10px' }}
					height={200}
					src={`${imageURL}` && `${import.meta.env.VITE_API}${imageURL}?t=${Date.now()}`}
				/>
			</div>
		</>
	)
}

export default UploadImg
