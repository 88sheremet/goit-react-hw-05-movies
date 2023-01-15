import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { actorsOnMovie } from 'services/api';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getActors = async () => {
      try {
        setIsLoading(true);
        const { data } = await actorsOnMovie(movieId);

        setActors(data.cast);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getActors();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {actors?.map(actor => {
          return (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt="Actor avatar"
                width="200"
              />
              <p>{actor.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Cast;
