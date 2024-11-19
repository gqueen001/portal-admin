import { Form, Input, Button, Flex, message } from 'antd'
import { Login } from '@/types/login'
import { createLogin } from '@/services/login'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
	const [messageApi, contextHolder] = message.useMessage()
	const navigate = useNavigate()

	const onFinish = async (values: Login) => {
		try {
			const token: { token: any } = await createLogin(values)
			localStorage.setItem('token', token.token)
			navigate('/')
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Couldn`t login',
			})
		}
	}
	return (
		<>
			{contextHolder}
			<Flex style={{ width: '100%', height: '100vh' }} justify='center' align='center'>
				<Form name='basic' style={{ width: 600 }} onFinish={onFinish}>
					<Form.Item
						name='login'
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input addonBefore={<span style={{ width: '150px' }}>Login:</span>} />
					</Form.Item>

					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password
							addonBefore={<span style={{ width: '150px' }}>Password:</span>}
						/>
					</Form.Item>
					<Flex justify='end'>
						<Form.Item label={null}>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
					</Flex>
				</Form>
			</Flex>
		</>
	)
}

export default LogIn
