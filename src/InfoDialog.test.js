import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { toBeVisible, toBeEmpty } from '@testing-library/jest-dom';

import InfoDialog from './InfoDialog';
import TmdbConfigContext from './TmdbConfigContext';
import mockTMDBconfig from './mockTMDBconfig';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = mockName => {
  const mocks = {
    noMovieData: {
      show: true,
      setShowDialog: () => {},
      selectedMovieId: 123,
      movies: [{}]
    },
    hasMovieData: {
      show: true,
      setShowDialog: () => {},
      selectedMovieId: 123,
      movies: [
        {
          poster_path: '/lnWkyG3LLgbbrIEeyl5mK5VRFe4.jpg',
          id: 123,
          title: 'the title',
          overview: 'a summary',
          release_date: '2019-12-13'
        }
      ]
    }
  };

  return (
    <TmdbConfigContext.Provider value={{ config: mockTMDBconfig }}>
      <InfoDialog {...mocks[mockName]} />
    </TmdbConfigContext.Provider>
  );
};

describe('<InfoDialog />', () => {
  afterEach(cleanup);

  test('renders empty dialog if no movie data provided', () => {
    const { container } = render(getMockedComponent('noMovieData'));
    expect(container.querySelector('dialog *')).toBeNull();
  });

  test('renders dialog html if valid movie data provided', () => {
    const { container } = render(getMockedComponent('hasMovieData'));
    expect(container.querySelector('dialog *')).not.toBeNull();
  });
});
