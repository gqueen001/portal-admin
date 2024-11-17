import { FC } from 'react'
import { Navigate } from 'react-router-dom'

export type TProps = {
	isAuthenticated: boolean
	authPath?: string
	outlet: JSX.Element
}

const Protected: FC<TProps> = ({ isAuthenticated, outlet }) => {
	console.log('it is protected', isAuthenticated)
	if (isAuthenticated) {
		return outlet
	}
	return <Navigate to={{ pathname: '/login' }} />
}

export default Protected
