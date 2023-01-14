import axios from 'axios';

const API_KEY = '2d3e3813d85f1ede47710555812cc992';

export const trendingMovies = async () => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );

  return data;
};

export const trendingMovieDetails = async (movieId = '1') => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  return data;
};

export const actorsOnMovie = async (movieId = '1') => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );

  return data;
};

export const reviewsOnMovie = async (movieId = '1') => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
  );

  return data;
};

export const searchMovie = async query => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  );

  return data;
};
