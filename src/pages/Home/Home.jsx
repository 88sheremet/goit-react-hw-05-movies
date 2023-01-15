import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { trendingMovies } from 'services/api';
import css from '../Home/Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await trendingMovies();

        setMovies(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today 🔥 </h2>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {movies &&
          movies.map(movie => {
            return (
              <li key={movie.id} className={css.list_ref}>
                <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
                  <h3 className={css.movie_title}>{movie.title}</h3>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;
