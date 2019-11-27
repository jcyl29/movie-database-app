import { objToQueryString } from './utilties';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const getPopularMovies = async () => {
  const options = {
    api_key: apiKey,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: 'trye',
    page: '1'
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${objToQueryString(options)}`,
    { mode: 'cors' }
  );

  const responseJson = await response.json();
  return responseJson.results;
};

const searchMoviebyName = async (name) => {
  const options = {
    api_key: apiKey,
    query: name,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?${objToQueryString(options)}`,
    { mode: 'cors' }
  );

  const responseJson = await response.json();
  return responseJson.results;
};

// search api
// https://api.themoviedb.org/3/search/movie?api_key=6554896d71842b7abfa6aff16e17b669&language=en-US&query=ip%20man&page=1&include_adult=false

export { getPopularMovies, searchMoviebyName };
