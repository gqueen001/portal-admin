import { Form, Input, Button, Flex, message } from 'antd'
import { Login } from '../../types/login'
import { createLogin } from '../../services/login'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
	const [messageApi, contextHolder] = message.useMessage()
	const [token, setToken] = useState<string>()
	const navigate = useNavigate()

	useEffect(() => {
		localStorage.setItem('token', JSON.stringify(token))
		navigate('/')
	}, [token])

	const onFinish = async (values: Login) => {
		console.log('it is value', values)

		try {
			const token: { token: any } = await createLogin(values)
			console.log('it is token', token)
			setToken(token.token)
			// messageApi.open({
			// 	type: 'success',
			// 	content: 'Succeccfully loged in',
			// })
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Couldn`t login',
			})
		}
	}
	// console.log('it is token', token)
	return (
		<>
			{contextHolder}
			<Flex style={{ width: '100%', height: '100vh' }} justify='center' align='center'>
				<Form
					name='basic'
					// labelCol={{ span: 8 }}
					// wrapperCol={{ span: 16 }}
					style={{ width: 600 }}
					// initialValues={{ remember: true }}
					onFinish={onFinish}
					// onFinishFailed={onFinishFailed}
					// autoComplete='off'
				>
					<Form.Item
						name='login'
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input addonBefore='Login:' />
					</Form.Item>

					<Form.Item
						// label='Password'
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password addonBefore='Password:' />
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
