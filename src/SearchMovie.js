import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from './utilties';
import { searchMoviebyName } from './api';

const arrowKeys = {
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40
}

const SearchMovie = ({ setResults, setRanSearch }) => {
  const handleKeyUp = debounce(async (searchValue, keyCode) => {
    const cleanedSearchValue = searchValue.trim();
    if (Object.values(arrowKeys).some(kc => kc === keyCode)) {
      return;
    }

    if (!cleanedSearchValue) {
      return;
    }

    const movies = await searchMoviebyName(searchValue);
    setResults(movies);
    setRanSearch(true)
  }, 1000);

  return (
    <input className='form-control'
      // https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
      onKeyUp={({ target: { value }, keyCode }) =>
        handleKeyUp(value, keyCode)
      }
      placeholder="Search for a movie"
    />
  );
};

SearchMovie.propTypes = {
  setResults: PropTypes.func.isRequired,
  setRanSearch: PropTypes.func.isRequired
};

export default SearchMovie;
