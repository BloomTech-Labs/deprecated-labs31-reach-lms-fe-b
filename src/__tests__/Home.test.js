import React from 'react';
import { render, cleanup, wait, waitFor } from '@testing-library/react';
import { HomePage } from '../components/pages/home';
import { LoadingComponent } from '../components/common';
import * as reactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: () => Promise.resolve({ name: 'sara' }),
      },
    };
  },
}));

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', () => {
    // listen for redux's dispatch and selector calls
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    // Setup before each test; clear previous test's mock return
    beforeEach(() => {
      useSelectorMock.mockClear();
      useDispatchMock.mockClear();
    });

    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue({ user: { role: 'test' } });

    const { getByText } = render(
      <Router>
        <HomePage
          LoadingComponent={() => (
            <LoadingComponent message="...fetching profile" />
          )}
        />
      </Router>
    );

    let loader = getByText(/...fetching profile/i);
    expect(loader).toBeInTheDocument();
  });
});
