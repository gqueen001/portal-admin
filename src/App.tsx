import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import MovieCategories from './pages/categories/Movie'
import Movies from './pages/movies/movies'
import Books from './pages/books/books'
import Musics from './pages/musics/musics'
import EditMovie from './pages/movies/editMovie'
import EditMusic from './pages/musics/editMusic'
import EditBook from './pages/books/editBook'
import LogIn from './components/login/login'
import Protected from './components/login/protected'
import { useEffect, useState } from 'react'
import { AxiosError, AxiosInstance } from 'axios'
import baseAxios from 'axios'
// import { authToken } from './components/login/authToken'
import { useRef } from 'react'
import axios from 'axios'

// import useAxiosInstance from './components/login/authToken'

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const token = localStorage.getItem('token')
	// let isAuthenticated: boolean = false
	console.log('it is isauth', token)

	useEffect(() => {
		// localStorage.getItem('token')
		const authToken = localStorage.getItem('token')
		setIsAuthenticated(authToken ? true : false)
		console.log('it is use effect', isAuthenticated)

		axios.interceptors.request.use(config => {
			if (authToken) {
				config.headers.Authorization = `Bearer ${authToken}`
			}
			return config
		})

		axios.interceptors.response.use(
			response => response,
			error => {
				const status = error.response ? error.response.status : null

				console.log('it is .....', error.response)
				if (status === 401 || status === 403) {
					console.log('it is errooooooor', status)

					localStorage.removeItem('token')
					// Handle unauthorized access
				}
				return Promise.reject(error)
			}
		)
	})

	// localStorage.removeItem('token')
	// axios.interceptors.request.use(config => {
	// 	if (import.meta.env.VITE_API) {
	// 		console.log('it is interseptor', config)
	// 	}
	// 	return config
	// }),
	// 	(error: any) => {
	// 		if (import.meta.env.VITE_API) {
	// 			console.error('it is wrrrorrrrrrrr', error)
	// 		}
	// 		return Promise.reject(error)
	// 	}
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<LogIn />} />
					<Route
						path='/'
						element={
							// <Layout />
							<Protected isAuthenticated={isAuthenticated} outlet={<Layout />} />
						}
					>
						<Route path='category'>
							<Route path='movie' element={<MovieCategories />} />
						</Route>
						<Route path='movies' element={<Movies />} />
						<Route path='books' element={<Books />} />
						<Route path='musics' element={<Musics />} />
						<Route path='movie/:id' element={<EditMovie />} />
						<Route path='music/:id' element={<EditMusic />} />
						<Route path='book/:id' element={<EditBook />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
