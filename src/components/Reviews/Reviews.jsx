import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { reviewsOnMovie } from 'services/api';
import css from '../Reviews/Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const { data } = await reviewsOnMovie(movieId);

        setReviews(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>There aren't any reviews for this movie</p>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {reviews?.map(review => {
          return (
            <li key={review.id}>
              <p className={css.autor_name}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
