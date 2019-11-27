import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom';
import SearchMovie from './SearchMovie';

expect.extend({ toBeVisible });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    setResults: () => {},
    setRanSearch: () => {}
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return <SearchMovie {...updatedProps} />;
};

describe('<SearchMovie />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible;
  });

  test('passed callback are called when user does a search', async () => {
    const setResults = jest.fn();
    const setRanSearch = jest.fn();
    const { container } = render(
      getMockedComponent({ setResults, setRanSearch })
    );
    expect(container).toBeVisible;

    const input = container.querySelector('input');

    fireEvent.change(input, {
      target: { value: 'some search term' }
    });

    fireEvent.keyUp(input, { key: 'Enter', code: 13 })

    await wait(() => {
      expect(setResults).toHaveBeenCalledTimes(1);
      expect(setRanSearch).toHaveBeenCalledTimes(1);
    });
  });
});
