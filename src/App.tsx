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
import { useEffect } from 'react'
import { authToken } from './components/login/authToken'

const App = () => {
	const token = localStorage.getItem('token')
	const isAuthenticated = token ? true : false
	console.log('it is isauth', isAuthenticated)
	localStorage.removeItem('token')
	// useEffect(() => {
	// 	const token = localStorage.getItem('token')
	// 	authToken(token)
	// })
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<LogIn />} />
					<Route
						path='/'
						element={
							<Protected isAuthenticated={isAuthenticated} outlet={<Layout />} />
						}
					>
						{/* <Route element={<Layout />}> */}
						{/* <Route path='/' /> */}
						<Route path='category'>
							<Route path='movie' element={<MovieCategories />} />
						</Route>
						<Route path='movies' element={<Movies />} />
						<Route path='books' element={<Books />} />
						<Route path='musics' element={<Musics />} />
						<Route path='movie/:id' element={<EditMovie />} />
						<Route path='music/:id' element={<EditMusic />} />
						<Route path='book/:id' element={<EditBook />} />
						{/* </Route> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
