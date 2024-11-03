import { Divider, Flex, Form, Input, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { FC, useEffect, useState } from 'react'
import { Category } from '../../types/categories'
import { CategoryById } from '../../types/modal'
import { getCategoriesById } from '../../services/category'
import { updateCategoriesById } from '../../services/category'

interface modalProps {
	isOpen: boolean
	setCloseModal: (value: boolean) => void
	categoryById: string
}

const OpenModal: FC<modalProps> = ({ isOpen, setCloseModal, categoryById }): JSX.Element => {
	const [messageApi, contextHolder] = message.useMessage()
	const [dataById, setDataById] = useState<CategoryById>({ titletk: '', titleru: '' })
	const [form] = Form.useForm()

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

	useEffect(() => {
		console.log('databyid', dataById)

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
		const updateCategoyr = async () => {
			try {
				await updateCategoriesById(values, +categoryById)
				setCloseModal(false)
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: "Couldn't post data",
				})
			}
		}

		updateCategoyr()
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
					onFinish={values => onFinish(values)}
					form={form}
				>
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
