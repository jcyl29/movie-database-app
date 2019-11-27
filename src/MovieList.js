import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import './movie-list.scss';

const MovieList = ({ moviesData, setSelectedMovie, setShowDialog }) => {
  const handleMovieItemClick = movieId => {
    setSelectedMovie(movieId);
    setShowDialog(true);
  };

  const renderMovies = () => {
    return moviesData.map(movie => (
      <MovieItem
        key={movie.id}
        handleMovieItemClick={handleMovieItemClick}
        data={movie}
      />
    ));
  };

  if (moviesData.length === 0) {
    return (
      <div className="alert alert-primary show fade" role="alert">
        No results found.
      </div>
    );
  }

  return <ul className="movie-list list-unstyled">{renderMovies()}</ul>;
};

MovieList.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setShowDialog: PropTypes.func.isRequired,
  setSelectedMovie: PropTypes.func.isRequired
};

export default MovieList;
