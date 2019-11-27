import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { toBeVisible, toBeEmpty } from '@testing-library/jest-dom';
import MovieList from './MovieList';
import TmdbConfigContext from './TmdbConfigContext';
import mockTMDBconfig from './mockTMDBconfig';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    moviesData: [],
    setShowDialog: () => {},
    setSelectedMovie: () => () => {}
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return (
    <TmdbConfigContext.Provider value={{ config: mockTMDBconfig }}>
      <MovieList {...updatedProps} />
    </TmdbConfigContext.Provider>
  );
};

describe('<MovieList />', () => {
  afterEach(cleanup);

  test('renders empty list if no data provided', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
    expect(container.querySelector('.movie-list *')).toBeNull();
  });

  test('renders list data html if data provided', () => {
    const mockMovieData = {
      poster_path: '/lnWkyG3LLgbbrIEeyl5mK5VRFe4.jpg',
      id: 123,
      title: 'the title',
      release_date: '2019-12-13'
    };

    const { container, getByText } = render(
      getMockedComponent({
        moviesData: [mockMovieData]
      })
    );
    expect(container).toBeVisible();
    expect(getByText(mockMovieData.title)).toBeVisible();
    expect(container.querySelector('.movie-list *')).not.toBeNull();
  });
});
