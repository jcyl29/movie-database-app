import React, { useState, useEffect } from 'react';

import { getGenres, getPopularMovies, getTMDBconfig } from './api';
import SearchMovie from './SearchMovie';
import './App.scss';
import './greyson-theme.css';
import InfoDialog from './InfoDialog';
import MovieList from './MovieList';
import { TmdbConfigProvider } from './TmdbConfigContext';
import Genres from './Genres';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(-1);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({});

  const [showDialog, setShowDialog] = useState(false);
  const [ranSearch, setRanSearch] = useState(false);

  const [tmdbConfig, setTmdbConfig] = useState(null);

  const getMovies = async () => {
    const withGenreList = Object.entries(selectedGenres)
      .reduce((acc, [genreId, checked]) => {
        if (checked) {
          acc.push(genreId);
        }

        return acc;
      }, [])
      .join(',');

    const results = await getPopularMovies({ with_genres: withGenreList });
    setMovies(results);
  };

  const getConfig = async () => {
    setTmdbConfig(await getTMDBconfig());
  };

  const getGenreList = async () => {
    const genresData = await getGenres();
    setGenres(genresData.sort((g1, g2) => g1.id - g2.id));
  };

  const updateAfterGenreSelect = (checked, genreId) => {
    setSelectedGenres(genres => {
      genres[genreId] = checked;

      // when dealing with objects/arrays in useState, must make copy of a old state
      // https://daveceddia.com/usestate-hook-examples/#example-usestate-with-an-object-multiple-values-sorta
      return { ...genres };
    });
  };

  useEffect(() => {
    getConfig();
    getMovies();
    getGenreList();
  }, [selectedGenres]);

  const subheaderText = ranSearch ? 'Search Results' : 'Popular Movies';

  return (
    <TmdbConfigProvider config={tmdbConfig}>
      <div className="App container">
        <header>
          <h1 className="text-light">Moviely</h1>
        </header>
        <SearchMovie setResults={setMovies} setRanSearch={setRanSearch} />
        <h3 className="text-light mt-3 mb-3">{subheaderText}</h3>
        <Genres
          data={genres}
          ranSearch={ranSearch}
          updateAfterGenreSelect={updateAfterGenreSelect}
        />
        <MovieList
          moviesData={movies}
          setSelectedMovie={setSelectedMovie}
          setShowDialog={setShowDialog}
          tmdbConfig={tmdbConfig}
        />

        <InfoDialog
          show={showDialog}
          movies={movies}
          selectedMovieId={selectedMovie}
          setShowDialog={setShowDialog}
          resetSelectedMovie={() => setShowDialog(false)}
        />
      </div>
    </TmdbConfigProvider>
  );
};

export default App;
