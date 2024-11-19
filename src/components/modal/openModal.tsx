import { Divider, Flex, Form, Input, message, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Category } from '@/types/categories/movie'
import { CategoryById, ModalProps } from '@/types/modal/openModal'
import {
	getCategoriesById,
	updateCategoriesById,
	createNewCategory,
} from '@/services/categories/movie.ts'

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
						titleTk: `${category.title.tk}`,
						titleRu: `${category.title.ru}`,
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't get",
					})
				}
			}
			fetchCategoryById()
		}
	}, [categoryId, isOpen])

	useEffect(() => {
		if (dataById) {
			form.setFieldsValue({
				titleTk: dataById.titleTk,
				titleRu: dataById.titleRu,
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
						content: 'Successfully updated',
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't update",
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
						content: 'Successfully created',
					})
				} catch (error) {
					messageApi.open({
						type: 'error',
						content: "Couldn't create",
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
						<Form.Item
							label='Title in turkmen:'
							name='titleTk'
							rules={[{ required: true, message: 'Title in turkmen is required' }]}
						>
							<Input name='titleTk' placeholder='Enter category' />
						</Form.Item>

						<Form.Item
							label='Title in russian:'
							name='titleRu'
							rules={[{ required: true, message: 'Title in russian is required' }]}
						>
							<Input name='titleRu' placeholder='Enter category' />
						</Form.Item>
					</Flex>
				</Form>
			</Modal>
		</>
	)
}

export default OpenModal
