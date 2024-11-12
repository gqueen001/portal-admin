import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import MovieCategories from './pages/categories/Movie'
import Movies from './pages/movies/movies'
import Books from './pages/books/books'
import Musics from './pages/musics/musics'
import EditMovie from './pages/movies/editMovie'
import EditMusic from './pages/musics/editMusic'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' />
						<Route path='category'>
							<Route path='movie' element={<MovieCategories />} />
						</Route>
						<Route path='movies' element={<Movies />} />
						<Route path='books' element={<Books />} />
						<Route path='musics' element={<Musics />} />
						<Route path='movie/:id' element={<EditMovie />} />
						<Route path='music/:id' element={<EditMusic />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
