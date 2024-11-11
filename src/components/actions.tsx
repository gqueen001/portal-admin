import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { FC } from 'react'
import { ActionProps } from '../types/actions'

const Actions: FC<ActionProps> = ({
	setOpenModal = () => {},
	setOpenDeleteModal = () => {},
}): JSX.Element => {
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
					icon={<DeleteOutlined />}
					onClick={() => {
						setOpenDeleteModal(true)
					}}
				></Button>
			</Col>
		</Row>
	)
}

export default Actions
