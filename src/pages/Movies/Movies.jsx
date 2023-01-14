import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { searchMovie } from 'services/api';
import Notiflix from 'notiflix';
import { ButtonGoBack } from 'components/ButtonGoBack/ButtonGoBack';
import { Loader } from 'components/Loader/Loader';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(searchQuery ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const location = useLocation();

  console.log(searchQuery);

  const onChange = e => {
    setQuery(e.target.value);
    console.log(query);
  };

  const onSubmit = e => {
    e.preventDefault();

    setSearchParams({ query: query });

    if (query === '') {
      Notiflix.Notify.failure(`Enter a query!`);
      return;
    }
  };

  useEffect(() => {
    if (query === '') return;

    const getSearchMovie = async () => {
      try {
        setIsLoading(true);
        // console.log(query)
        const { data } = await searchMovie(query);
        setSearchMovies(data.results);
        // console.log(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovie();
  }, [query]);

  return (
    <>
      <ButtonGoBack />
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        {isLoading && <Loader />}

        <ul>
          {searchMovies.map(movie => {
            return (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
                  <p>{movie.title}</p>
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