import { DashboardView } from '../components/pages';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';

// mock data to be returned in mocked useSelector call
const mockPrograms = {
  programs: [
    {
      programId: 1,
      programName: 'name1',
      programDescription: 'description1',
    },
    {
      programId: 2,
      programName: 'name2',
      programDescription: 'description2',
    },
    {
      programId: 3,
      programName: 'name3',
      programDescription: 'description3',
    },
  ],
};

describe('Simple <DashboardView /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test('it handles a loading state', () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockPrograms);

    //render component
    const { getByText } = render(
      <Router>
        <DashboardView />
      </Router>
    );

    // assert that expected data is rendered to the page
    let name = getByText(/name1/i);
    expect(name).toBeInTheDocument();
  });
});
