import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { actorsOnMovie } from 'services/api';

export const Cast = () => {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  // console.log('movieId', movieId);
  console.log(isLoading)


  useEffect(() => {
    const getActors = async () => {
      try {
        setIsLoading(true);
        const { data } = await actorsOnMovie(movieId);

        console.log(data);
        setActors(data.cast);
        //   console.log(actors)
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getActors();
  }, [movieId]);

  // console.log(actors)
  return (
    <ul>
      {actors?.map(actor => {
        return (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt=""
              width="200"
            />
            <p>{actor.name}</p>
          </li>
        );
      })}
    </ul>
  );
};
