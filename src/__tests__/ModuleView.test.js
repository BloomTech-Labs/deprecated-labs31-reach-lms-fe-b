import { ModuleView } from '../components/pages';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import expect from 'expect';

// mock data to be passed in as props to component
const mockModule = {
  moduleId: 1,
  moduleName: 'name1',
  moduleDescription: 'description1',
};

describe('<ModuleView /> test suite', () => {
  test('it handles a loading state', () => {
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
