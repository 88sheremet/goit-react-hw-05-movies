import { ButtonGoBack } from 'components/ButtonGoBack/ButtonGoBack';
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { trendingMovieDetails } from 'services/api';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation()
  

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        const { data } = await trendingMovieDetails(movieId);

        // console.log(data);
        setMovie(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  // console.log(movie);
  const genre = movie?.genres.map(genre => (
    <span key={genre.id}>{genre.name}</span>
  ));

  if (!movie) {
    return null;
  }

  return (
    <>
    <ButtonGoBack/>
    <div>
      {isLoading && <Loader/>}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt=""
      />
      <h2>{movie.title}</h2>
      <h2>User Score: {movie.vote_average * 10}%</h2>

      <h2>Overview:</h2>
      <p>{movie.overview}</p>
      <h2>Genres:</h2>
      <p>{genre}</p>
      <h2>Additional information:</h2>

      <ul>
        <li>
          <NavLink to="cast" state={{ from: location.state?.from ?? '/' }}>Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={{ from: location.state?.from ?? '/' }}>Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
    </>
  );
};


export default MovieDetails;