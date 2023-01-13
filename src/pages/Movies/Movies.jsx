import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { searchMovie } from 'services/api';
import Notiflix from 'notiflix';

console.log(useParams)
console.log(useSearchParams)

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState([])
//   const [searchParams, setSearchParams] = useSearchParams();
//   const searchQuery = searchParams.get('query');
//   const { movieId } = useParams();
console.log(isLoading)

  const onChange = e => {
    setQuery(e.target.value);
    console.log(query)
    // setIsLoading(true);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (query === '') {
      Notiflix.Notify.failure(`Enter a query!`);
      return;
    } else if (query !== '') {
        // console.log(e.target.value)
      setQuery(e.target.value);
    }
    console.log(query)
  };

  useEffect(() => {
    if (query === '') return

    const getSearchMovie = async () => {
      try {
        setIsLoading(true);
        // console.log(query)
        const {data} = await searchMovie(query);
        setSearchMovies(data.results);
        console.log(data.results);
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
    <div>
      <form  onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
      </form>
      <button type='submit'>Search</button>
    </div>
<div>
    {searchMovies && (<ul>
        {searchMovies.map(movie =>{
            return (
               
                <li>
                     <Link to={`/movies/${movie.id}`}>
                    <p>{movie.title}</p>
                    </Link> 
                </li>
            )
        })}
    </ul>)}
    </div>
    </>
  );
};
