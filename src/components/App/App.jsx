import { Cast } from 'components/Cast/Cast';
import { Home } from 'pages/Home/Home';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Movies } from 'pages/Movies/Movies';
import { Reviews } from 'components/Reviews/Reviews';
import { Routes, Route, NavLink } from 'react-router-dom';
import css from '../App/App.module.css';

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className={css.home}>
            Home
          </NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};
