import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { toBeVisible, toBeEmpty } from '@testing-library/jest-dom';

import MovieItem from './MovieItem';
import TmdbConfigContext from './TmdbConfigContext';
import mockTMDBconfig from './mockTMDBconfig';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    data: {
      title: 'the title',
      id: 1234,
      poster_path: '/somepath.jpg',
      release_date: '12-22-2019'
    },
    handleMovieItemClick: () => {}
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return (
    <TmdbConfigContext.Provider value={{ config: mockTMDBconfig }}>
      <MovieItem {...updatedProps} />
    </TmdbConfigContext.Provider>
  );
};

describe('<MovieItem />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
  });
});
