import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { toBeVisible, toBeEmpty } from '@testing-library/jest-dom';
import Genres from './Genres';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    data: [
      {
        name: 'genre1',
        id: 1
      },
      {
        name: 'genre2',
        id: 2
      }
    ],
    updateAfterGenreSelect: () => {},
    ranSearch: true
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return <Genres {...updatedProps} />;
};

describe('<Genres />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
  });
});
