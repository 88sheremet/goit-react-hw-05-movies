import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { reviewsOnMovie } from 'services/api';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
console.log(isLoading)

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const { data } = await reviewsOnMovie(movieId);
        console.log(data);
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
    <ul>
      {reviews?.map(review => {
        return (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};
