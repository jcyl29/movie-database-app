import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './genres.scss';

const Genres = ({ data, ranSearch, updateAfterGenreSelect }) => {
  const [showAll, setShowAll] = useState(false);
  const initialList = 5;

  if (ranSearch) {
    return null;
  }

  const showAllBtnClasses = classnames('btn btn-info btn-sm', {
    'd-none': showAll
  });

  const containerClasses = classnames('bg-light ml-4 p-2 mb-3', {
    'pb-2': !showAll
  });

  return (
    <div className={containerClasses}>
      <h5>Filter by Genre:</h5>
      <ul className="genre-list list-unstyled">
        {data.map((genre, index) => {
          const genreClassNames = classnames('custom-control custom-checkbox', {
            'd-none': index > initialList && !showAll
          });
          return (
            <li
              className={genreClassNames}
              key={`genre_${genre.id}_${genre.name}`}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`genre-${genre.id}`}
                onChange={({ target: { checked } }) =>
                  updateAfterGenreSelect(checked, genre.id)
                }
              />
              <label
                className="custom-control-label"
                htmlFor={`genre-${genre.id}`}
              >
                {genre.name}
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={() => setShowAll(true)} className={showAllBtnClasses}>
        Show all
      </button>
    </div>
  );
};

Genres.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  ranSearch: PropTypes.bool.isRequired,
  updateAfterGenreSelect: PropTypes.func.isRequired
};

export default Genres;
