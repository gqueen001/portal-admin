import { Divider, Flex, Form, Input, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { FC, useEffect, useState } from 'react'
import { Category } from '../../types/categories'
import { CategoryById } from '../../types/modal'
import { getCategoriesById } from '../../services/category'

interface modalProps {
	isOpen: boolean
	setCloseModal: (value: boolean) => void
	categoryById: string
}

const OpenModal: FC<modalProps> = ({ isOpen, setCloseModal, categoryById }): JSX.Element => {
	const [messageApi, contextHolder] = message.useMessage()
	const [dataById, setDataById] = useState<CategoryById>()
	const [changeValue, setChangeValue] = useState<CategoryById>({ titletk: '', titleru: '' })

	useEffect(() => {
		if (isOpen) {
			const fetchCategoryById = async () => {
				try {
					const category: Category = await getCategoriesById(+categoryById)
					console.log('category by id', category)
					setDataById({
						titletk: `${category.title.tk}`,
						titleru: `${category.title.ru}`,
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't fetch data",
					})
				}
			}
			fetchCategoryById()
		}
	}, [isOpen])

	return (
		<>
			{contextHolder}
			<Modal
				title='Edit Category'
				open={isOpen}
				// onOk={handleOk}
				onCancel={() => {
					setCloseModal(false)
				}}
			>
				<Divider />

				<Form
					layout='vertical'
					initialValues={{
						titletk: `${dataById?.titletk}`,
						titleru: `${dataById?.titleru}`,
					}}
				>
					<Flex justify='space-between'>
						<Form.Item label='Title tk:'>
							<Input
								value={changeValue?.titletk}
								name='titletk'
								onChange={e =>
									setChangeValue(prevState => ({
										...prevState,
										titletk: e.target.value,
									}))
								}
							/>
						</Form.Item>

						<Form.Item label='Title ru:'>
							<Input
								name='titleru'
								onChange={e => {
									setChangeValue(prevState => ({
										...prevState,
										titleru: e.target.value,
									}))
								}}
								value={changeValue?.titleru}
							/>
						</Form.Item>
					</Flex>
				</Form>
			</Modal>
		</>
	)
}

export default OpenModal
