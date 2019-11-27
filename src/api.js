import { objToQueryString } from './utilties';
import cache from 'memory-cache';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const getCachedData = async (url, fetchOptions) => {
  const key = `__cache__${url}`;
  let result = cache.get(key);

  if (!result) {
    const response = await fetch(url, fetchOptions);
    result = response.json();
    cache.put(key, result);
  }

  return result;
};

const parseResults = async (
  url,
  fetchOptions = { mode: 'cors' },
  targetKey
) => {
  let response;
  try {
    response = await getCachedData(url, fetchOptions);
  } catch (e) {
    return [];
  }

  return targetKey ? response[targetKey] : response;
};

// https://developers.themoviedb.org/3/getting-started/images
const getTMDBconfig = async () => {
  const options = {
    api_key: apiKey
  };

  return parseResults(
    `https://api.themoviedb.org/3/configuration?${objToQueryString(options)}`
  );
};

const getPopularMovies = async (opts = {}) => {
  const options = {
    api_key: apiKey,
    language: opts.language || 'en-US',
    sort_by: opts.sort_by || 'popularity.desc',
    include_adult: opts.include_adult || false,
    include_video: opts.include_video || true,
    page: opts.page || '1',
    ...opts
  };

  return parseResults(
    `https://api.themoviedb.org/3/discover/movie?${objToQueryString(options)}`,
    undefined,
    'results'
  );
};


const getGenres = async () => {
  const options = {
    api_key: apiKey
  };

  return parseResults(
    `https://api.themoviedb.org/3/genre/movie/list?${objToQueryString(options)}`,
    undefined,
    'genres'
  );
};

const searchMoviebyName = async (name, opts = {}) => {
  const options = {
    api_key: apiKey,
    query: name,
    language: opts.language || 'en-US',
    sort_by: opts.sort_by || 'popularity.desc',
    include_adult: opts.include_adult || false,
    ...opts
  };

  return parseResults(
    `https://api.themoviedb.org/3/search/movie?${objToQueryString(options)}`,
    undefined,
    'results'
  );
};

const getMovieCast = async (movieId, limit = 5) => {
  const options = {
    api_key: apiKey
  };

  const results = await parseResults(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?${objToQueryString(
      options
    )}`,
    undefined,
    'cast'
  );

  return results.slice(0, limit).sort((a, b) => a.cast_id - b.cast_id);
};

export { getTMDBconfig, getPopularMovies, searchMoviebyName, getMovieCast, getGenres };
