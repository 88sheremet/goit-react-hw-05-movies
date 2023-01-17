import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { trendingMovieDetails } from 'services/api';
import css from '../MovieDetails/MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        const { data } = await trendingMovieDetails(movieId);

        setMovie(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  const genre = movie?.genres.map(genre => (
    <span key={genre.id} className={css.genre_name}>
      {genre.name},
    </span>
  ));

  if (!movie) {
    return null;
  }

  return (
    <>
      <NavLink to={location.state?.from ?? ''}>
        <button className={css.buttonGoBack}>🡄 Go Back</button>
      </NavLink>
      <div>
        <div className={css.movie_container}>
          {isLoading && <Loader />}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt=""
            width="480"
            height="320"
          />
          <div>
            <h2>{movie.title}</h2>
            <h2>User Score: {Math.round(movie.vote_average * 10)}%</h2>

            <h2>Overview:</h2>
            <p>{movie.overview}</p>
            <h2>Genres:</h2>
            <p>{genre}</p>
          </div>
        </div>

        <h2 className={css.additional}>Additional information:</h2>

        <ul className={css.additional_list}>
          <li>
            <NavLink
              to="cast"
              state={{ from: location.state?.from ?? '/' }}
              className={css.additional_list_item}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              state={{ from: location.state?.from ?? '/' }}
              className={css.additional_list_item}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;
