import React from 'react';
import { cleanup, render, wait } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom';
import { FetchMock } from '@react-mock/fetch';

import App from './App';
import mockmovies from './mockmovies';
import mockTMDBconfig from './mockTMDBconfig';
import mockGenres from './mockGenres';

expect.extend({ toBeVisible });

const getMockedComponent = () => {
  return (
    <FetchMock
      mocks={[
        {
          matcher: new RegExp('/3/discover/movie'),
          method: 'GET',
          response: mockmovies
        },
        {
          matcher: new RegExp('/3/configuration'),
          method: 'GET',
          response: mockTMDBconfig
        },
        {
          matcher: new RegExp('/3/genre/movie/list'),
          method: 'GET',
          response: mockGenres
        }
      ]}
    >
      <App />
    </FetchMock>
  );
};

describe('<App />', () => {
  afterEach(cleanup);

  test('renders with mocking fetch requests', async () => {
    const { container } = render(getMockedComponent());
    expect(container.querySelector('.movie-list')).toBeNull();
    await wait(() => {
      expect(container.querySelector('.movie-list').children.length).toEqual(
        mockmovies.results.length
      );
    });
  });
});
