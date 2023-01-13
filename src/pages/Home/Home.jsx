import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trendingMovies } from 'services/api';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const {data} = await trendingMovies();
        
        setMovies(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies()
  }, []);

  return <div>{isLoading && <p>loading ...</p>}
  <h2>Trending today</h2>
   {movies && movies.map(movie => {
                        // console.log(movie)
                        return (
                            <li  key={movie.id}>
                          <Link to={`/movies/${movie.id}`}>
                          
                                <h3>{movie.title}</h3>
                                </Link>  
                           
                            </li>
                        );
                    })}</div>;
};
