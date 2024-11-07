import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import MovieCategories from './pages/categories/Movie'
import MusicCategories from './pages/categories/Music'
import BookCategories from './pages/categories/Book'
import Movies from './pages/movies'
import Books from './pages/books'
import Musics from './pages/musics'
import EditMovie from './pages/editMovie'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' />
						<Route path='category'>
							<Route path='movie' element={<MovieCategories />} />
							<Route path='music' element={<MusicCategories />} />
							<Route path='book' element={<BookCategories />} />
						</Route>
						<Route path='movies' element={<Movies />} />
						<Route path='books' element={<Books />} />
						<Route path='musics' element={<Musics />} />
						<Route path='edit/:id' element={<EditMovie />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
