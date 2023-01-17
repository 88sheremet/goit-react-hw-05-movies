import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { searchMovie } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from '../Movies/Movies.module.css';
import Searchbar from 'components/Searchbar/Searchbar';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const location = useLocation();

  const onChangeQuery = newQuery => {
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query === '') return;

  

    const getSearchMovie = async query => {
      try {
        setIsLoading(true);

        const { data } = await searchMovie(query);
        setSearchMovies(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovie(query);

    if(query !== ''){
      getSearchMovie(query);
    }
  }, [query]);

  

  return (
    <>
      <Searchbar onChangeQuery={onChangeQuery} />

      <div>
        {isLoading && <Loader />}

        <ul className={css.list}>
          {searchMovies.map(movie => {
            return (
              <li key={movie.id} className={css.list_ref}>
                <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
                  <p className={css.movie_title}>{movie.title}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Movies;
