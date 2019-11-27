import React, { useState, useEffect } from 'react';
import { getPopularMovies } from './api';
import SearchMovie from './searchMovie';

const App = () => {
  const [result, setResult] = useState([]);

  const getMovies = async function() {
    setResult(await getPopularMovies());
  };

  useEffect(() => {
    getMovies();
  }, []);

  const renderMovies = () => {
    return result.map(movie => <li key={movie.id}>{movie.title}</li>);
  };

  return (
    <div className="App">
      <SearchMovie />

      <ul>{renderMovies()}</ul>

      {/*<div>*/}
      {/*  <small>*/}
      {/*    You are running this application in <b>{process.env.NODE_ENV}</b>{" "}*/}
      {/*    mode.*/}
      {/*  </small>*/}
      {/*  <small>*/}
      {/*    REACT_APP_TMDB_API_KEY={process.env.REACT_APP_TMDB_API_KEY}*/}
      {/*  </small>*/}
      {/*</div>*/}

      {/*https://www.themoviedb.org/documentation/api*/}
      {/*https://developers.themoviedb.org/3/search/search-movies*/}

      <pre style={{ whiteSpace: 'normal' }}>
        {/*We would like you to build a small web app for finding information about*/}
        {/*all of your favorite movies using the The Movie Database API. Minimum*/}
        {/*Feature Set When first loaded, the user should see a list of the most*/}
        {/*popular movies and a search bar. A user should be able to search for a*/}
        {/*movie by title in the search bar, and the matching results should show*/}
        {/*up in the list of movies. A user can click on a movie in the list and be*/}
        {/*taken to a page that displays more details for the movie (title, movie*/}
        {/*poster, release date, cast, synopsis, etc) Technical Requirements Using*/}
        {/*Node.js, create a backend application that accepts requests to power the*/}
        {/*features above. This app should query the Movie DB API and return the*/}
        {/*results to the user. Compose your UI using React or Vue. Please include*/}
        {/*a README.md with step-by-step instructions for running the app. Be*/}
        {/*careful to ensure there are not local dependencies that have been*/}
        {/*overlooked in the readme. Extra Points (optional) Add more features that*/}
        {/*you think are cool! Some ideas: Add filtering by genre Show related*/}
        {/*movies Add a page for individual actor details Add a caching layer for*/}
        {/*your requests to the 3rd party API. This not a design exercise, but UX*/}
        {/*polish that demonstrates your mastery of your frontend tool set is*/}
        {/*encouraged. Add unit testing for your API.*/}
      </pre>
    </div>
  );
};

export default App;
