import { Divider, Flex, Form, Input, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { FC, useEffect, useState } from 'react'
import { Category } from '../../types/categories'
import { CategoryById } from '../../types/openModal'
import { getCategoriesById } from '../../services/category'
import { updateCategoriesById } from '../../services/category'
import { ModalProps } from '../../types/openModal'
import { createNewCategory } from '../../services/category'

const OpenModal: FC<ModalProps> = ({ isOpen, setCloseModal, categoryId }): JSX.Element => {
	const [messageApi, contextHolder] = message.useMessage()
	const [dataById, setDataById] = useState<CategoryById>()
	const [form] = Form.useForm()

	useEffect(() => {
		if (isOpen && categoryId !== 'new') {
			const fetchCategoryById = async () => {
				try {
					const category: Category = await getCategoriesById(+categoryId)
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
	}, [categoryId, isOpen])

	useEffect(() => {
		if (dataById) {
			form.setFieldsValue({
				titletk: dataById.titletk,
				titleru: dataById.titleru,
			})
		}
	}, [dataById, form])

	const onFinish = (values: CategoryById) => {
		if (categoryId !== 'new') {
			const updateCategory = async () => {
				try {
					await updateCategoriesById(values, +categoryId)
					setCloseModal(false)
					messageApi.open({
						type: 'success',
						content: 'Updates successfully',
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't post data",
					})
				}
			}

			updateCategory()
		} else {
			const createCategory = async () => {
				try {
					await createNewCategory(values)
					setCloseModal(false)
					messageApi.open({
						type: 'success',
						content: 'Created successfully',
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't create data",
					})
				}
			}
			createCategory()
		}
		form.resetFields()
	}

	return (
		<>
			{contextHolder}
			<Modal
				forceRender
				title={categoryId === 'new' ? 'Add category' : 'Edit category'}
				open={isOpen}
				onOk={form.submit}
				onCancel={() => {
					form.resetFields()
					setCloseModal(false)
				}}
			>
				<Divider />

				<Form layout='vertical' onFinish={onFinish} form={form}>
					<Flex justify='space-between'>
						<Form.Item label='Title tk:' name='titletk' rules={[{ required: true }]}>
							<Input name='titletk' placeholder='Enter category' />
						</Form.Item>

						<Form.Item label='Title ru:' name='titleru' rules={[{ required: true }]}>
							<Input name='titleru' placeholder='Enter category' />
						</Form.Item>
					</Flex>
				</Form>
			</Modal>
		</>
	)
}

export default OpenModal
