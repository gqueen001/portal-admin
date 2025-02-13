import { Flex, Menu } from 'antd'
import {
	VideoCameraOutlined,
	ReadOutlined,
	CustomerServiceOutlined,
	MenuOutlined,
	FormOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
	const navigate = useNavigate()

	const items = [
		{
			key: 'category',
			label: 'Category',
			icon: <MenuOutlined />,
			children: [
				{
					key: '/category/movie',
					label: 'Movie',
					icon: <VideoCameraOutlined />,
				},
			],
		},
		{
			key: 'movies',
			label: 'Movies',
			icon: <VideoCameraOutlined />,
		},
		{
			key: 'musics',
			label: 'Musics',
			icon: <CustomerServiceOutlined />,
		},
		{
			key: 'books',
			label: 'Books',
			icon: <ReadOutlined />,
		},
		{
			key: 'sse-connection',
			label: 'SSE',
			icon: <FormOutlined />,
		},
		{
			key: 'dump',
			label: 'Dump',
			icon: <FormOutlined />,
		},
	]

	return (
		<>
			<Flex gap={'10px'}>
				<Menu
					onClick={record => {
						navigate(`${record.key}`)
					}}
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
