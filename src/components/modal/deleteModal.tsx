import { DeleteModalProps } from '../../types/deleteModal'
import { FC } from 'react'
import { message, Typography, Modal } from 'antd'
import { deleteCategory } from '../../services/categories/movie.ts'
import { deleteMovie } from '../../services/movies.ts'

const DeleteModal: FC<DeleteModalProps> = ({
	isOpen,
	setCloseModal,
	deleteId,
	item,
}): JSX.Element => {
	const { Text } = Typography
	const [messageApi, contextHolder] = message.useMessage()

	const deleteById = async () => {
		if (item === 'category') {
			try {
				await deleteCategory(+deleteId)
				messageApi.open({
					type: 'success',
					content: 'Successfully deleted',
				})
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't delete",
				})
			}
		} else if (item === 'movie') {
			try {
				await deleteMovie(+deleteId)
				messageApi.open({
					type: 'success',
					content: 'Successfully deleted',
				})
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't delete",
				})
			}
		}
		setCloseModal(false)
	}
	return (
		<>
			{contextHolder}
			<Modal
				forceRender
				title={`Delete ${item}`}
				open={isOpen}
				centered={true}
				okType='danger'
				onCancel={() => {
					setCloseModal(false)
				}}
				onOk={deleteById}
			>
				<Text strong type='danger'>
					Are you sure delete this {`${item}`}?
				</Text>
			</Modal>
		</>
	)
}

export default DeleteModal
