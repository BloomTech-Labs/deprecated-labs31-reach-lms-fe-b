import DashboardView from '../components/pages';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as redux from 'redux';
import * as reactRedux from 'react-redux';
// Import your own reducer
import * as store from '../state';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    // const authService = {
    //   logout: jest.fn(),
    // };
    // const { getByText } = render(
    //   <Router>
    //     <RenderHomePage userInfo={{ name: 'Sara' }} authService={authService} />
    //   </Router>
    // );
    // const button = getByText(/logout/i);
    // userEvent.click(button);
    // expect(authService.logout).toHaveBeenCalledTimes(1);
    useSelectorMock.mockReturnValue();
  });
});
