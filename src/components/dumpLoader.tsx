import { Flex, Modal, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FC } from 'react'

const DumpLoader: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<>
			<Modal title='Please wait for posting.' open={loading} closable={false} footer={null}>
				<Flex justify='center'>
					<Spin
						indicator={<LoadingOutlined spin />}
						size='large'
						style={{ textAlign: 'center' }}
					/>
				</Flex>
			</Modal>
		</>
	)
}

export default DumpLoader
