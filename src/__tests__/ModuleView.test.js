import { ModuleView } from '../components/pages';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import expect from 'expect';

// mock data to be passed in as props to component
const mockModule = {
  moduleId: 1,
  moduleName: 'name1',
  moduleDescription: 'description1',
};

describe('<ModuleView /> test suite', () => {
  // listen for redux's dispatch and selector calls
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  // Setup before each test; clear previous test's mock return
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test('it handles a loading state', () => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue(mockModule);

    //render component
    const { getByText } = render(
      <Router>
        <ModuleView {...mockModule} />
      </Router>
    );

    // assert proper data is render to the page
    let name = getByText(/name1/i);
    expect(name).toBeInTheDocument();
  });
});
