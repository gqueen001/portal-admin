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
	const [dataById, setDataById] = useState<CategoryById>({ titletk: '', titleru: '' })
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

	const editInput = (e: any) => {
		setDataById(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

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
		setDataById({
			titleru: '',
			titletk: '',
		})
	}

	return (
		<>
			{contextHolder}
			<Modal
				forceRender
				title='Edit Category'
				open={isOpen}
				onOk={form.submit}
				onCancel={() => {
					setDataById({
						titleru: '',
						titletk: '',
					})
					setCloseModal(false)
				}}
			>
				<Divider />

				<Form layout='vertical' onFinish={values => onFinish(values)} form={form}>
					<Flex justify='space-between'>
						<Form.Item label='Title tk:' name='titletk'>
							<Input name='titletk' onChange={e => editInput(e)} />
						</Form.Item>

						<Form.Item label='Title ru:' name='titleru'>
							<Input name='titleru' onChange={e => editInput(e)} />
						</Form.Item>
					</Flex>
				</Form>
			</Modal>
		</>
	)
}

export default OpenModal
