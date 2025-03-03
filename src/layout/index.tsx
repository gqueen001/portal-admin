import { Button, Flex, Menu } from 'antd'
import {
	VideoCameraOutlined,
	ReadOutlined,
	CustomerServiceOutlined,
	MenuOutlined,
	FormOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Layout = () => {
	const [collapsed, setCollapsed] = useState(false)
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

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return (
		<>
			<Flex gap={'10px'}>
				<div style={{ width: 256 }}>
					<Button type='primary' onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
						{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</Button>
					<Menu
						onClick={record => {
							navigate(`${record.key}`)
						}}
						style={{ height: '100vh' }}
						mode='inline'
						items={items}
						inlineCollapsed={collapsed}
					/>
				</div>
				<Outlet></Outlet>
			</Flex>
		</>
	)
}

export default Layout
