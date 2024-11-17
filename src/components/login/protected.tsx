import { FC } from 'react'
import { Navigate } from 'react-router-dom'

export type TProps = {
	authPath?: string
	outlet: JSX.Element
}

const Protected: FC<TProps> = ({ outlet }) => {
	if (localStorage.getItem('token')) {
		return outlet
	}
	return <Navigate to={{ pathname: '/login' }} />
}

export default Protected
