import React, { useState, useRef } from 'react';
import { debounce } from './utilties';
import { searchMoviebyName } from './api';
import './App.scss';

const SearchMovie = () => {
  const inputEl = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const handleKeyDown = debounce(async (searchValue, keyCode) => {
    if (keyCode === 40) {
      return;
    }
    // console.log("value", val);
    const results = await searchMoviebyName(searchValue);
    console.log('handleKeyDown, results=', results, 'keyCode', keyCode);
    setSearchResults(
      results.map(result => {
        return { title: result.title, id: result.id };
      })
    );
  }, 1000);

  return (
    <>
      <input
        ref={inputEl}
        // https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
        onKeyDown={({ target: { value }, keyCode }) =>
          handleKeyDown(value, keyCode)
        }
        list="movies"
      />

      {/* https://stackoverflow.com/questions/15622076/making-html5-datalist-visible-when-focus-event-fires-on-input */}
      <datalist id="movies">
        {searchResults.map(result => (
          <option value={result.title} key={result.id}>
            {result.title}_${result.id}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default SearchMovie;
