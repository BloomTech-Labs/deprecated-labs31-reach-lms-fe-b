import { CourseView } from '../components/pages';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';

// mock data to be returned in mocked useSelector call
const mockCourse = {
  courseId: 1,
  courseName: 'name1',
  courseDescription: 'description1',
  modules: [],
};

describe('<CourseView /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test('it handles a loading state', async () => {
    // when spyOn detects dispatch/selector call, mock dispatch and selector
    // return values
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockCourse);

    //render component
    const { getByText } = render(
      <Router>
        <CourseView {...mockCourse} />
      </Router>
    );

    // await for mockThunk to dispatch and assert that expected data is
    // rendered to the page
    await waitFor(() => {
      let name = getByText(/name1/i);
      expect(name).toBeInTheDocument();
    });
  });
});
