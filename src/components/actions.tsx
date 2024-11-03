import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { FC } from 'react'

interface actionprop {
	setOpenModal: (value: boolean) => void
}
const Actions: FC<actionprop> = ({ setOpenModal = () => {} }): JSX.Element => {
	return (
		<Row justify={'center'} align={'middle'} gutter={8}>
			<Col>
				<Button
					size='large'
					type='primary'
					icon={<EditOutlined size={24} />}
					onClick={() => {
						setOpenModal(true)
					}}
				></Button>
			</Col>
			<Col>
				<Button
					size='large'
					type='primary'
					danger
					icon={<DeleteOutlined onClick={() => {}} />}
				></Button>
			</Col>
		</Row>
	)
}

export default Actions
