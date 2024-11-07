import { PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Upload, Button } from 'antd'
import { useState } from 'react'

const UploadImg = () => {
	const [base64Image, setBase64Image] = useState(null)

	const handleBeforeUpload = (file: any) => {
		const reader = new FileReader()

		reader.onload = (e: any) => {
			setBase64Image(e.target.result)
		}

		reader.readAsDataURL(file)
		return false
	}

	return (
		<>
			<ImgCrop rotationSlider>
				<Upload
					action='`${import.meta.env.VITE_API}'
					listType='picture-card'
					maxCount={1}
					beforeUpload={file => handleBeforeUpload(file)}
				>
					<Button
						icon={<PlusOutlined />}
						style={{ border: 'none', backgroundColor: 'transparent' }}
					>
						Upload img
					</Button>
				</Upload>
			</ImgCrop>
		</>
	)
}

export default UploadImg
