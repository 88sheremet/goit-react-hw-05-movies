import { Routes, Route, NavLink } from 'react-router-dom';
import css from '../App/App.module.css';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const Cast = lazy(() => import('components/Cast/Cast'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? css.home && css.active : css.home
            }
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? css.movies && css.active : css.movies
            }
          >
            🎬 Movies
          </NavLink>
        </nav>
      </header>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
