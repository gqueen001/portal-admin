import { Flex, Menu } from 'antd'
import { MailOutlined, ReadOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
	const navigate = useNavigate()

	const items = [
		{
			key: 'category',
			label: 'Category',
			icon: <MailOutlined />,
			children: [
				{
					key: '/category/movie',
					label: 'Movie',
					icon: <MailOutlined />,
				},
				{
					key: '/category/music',
					label: 'Music',
					icon: <MailOutlined />,
				},
				{
					key: '/category/book',
					label: 'Book',
					icon: <MailOutlined />,
				},
			],
		},
		{
			key: 'movies',
			label: 'Movies',
			icon: <MailOutlined />,
		},
		{
			key: 'musics',
			label: 'Musics',
			icon: <MailOutlined />,
		},
		{
			key: 'books',
			label: 'Books',
			icon: <ReadOutlined />,
		},
	]

	return (
		<>
			<Flex gap={'10px'}>
				<Menu
					onClick={record => navigate(`${record.key}`)}
					style={{ width: 256, height: '100vh' }}
					mode='inline'
					items={items}
				/>
				<Outlet></Outlet>
			</Flex>
		</>
	)
}

export default Layout
