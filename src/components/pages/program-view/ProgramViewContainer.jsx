import React from 'react';
import { Button } from '../../common/index';
import './programView.css';

//Test Data
const programData = {
  programName: 'Test Program Name',
  programType: 'Education K-12',
  programDesc: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
  at consectetur lorem donec. Venenatis tellus in metus vulputate eu
  scelerisque felis imperdiet. Sapien faucibus et molestie ac
  feugiat sed. Eget aliquet nibh praesent tristique magna sit amet
  purus."`,

  courses: [
    {
      courseName: 'Test Course Name 1',
      courseDesc: 'Test Description 12345',
    },
    {
      courseName: 'Test Course Name 2',
      courseDesc: 'Test Description 54321',
    },
    {
      courseName: 'Test Course Name 3',
      courseDesc: 'Test Description 00000',
    },
  ],
};

const ProgramViewContainer = props => {
  return (
    <>
      {/*Course Title Section*/}
      <div className="titleContainer">
        <div>
          <h2>{programData.programName}</h2>
          <h3>{programData.programType}</h3>
        </div>
        <div>
          <Button buttonText="Edit" />
        </div>
      </div>

      {/*Course Description Section*/}
      <div className="container">{programData.programDesc}</div>

      {/*Render Course Components Section*/}
      {/*Will replace with the actual Course component when available*/}
      <div className="container">
        <h4>Courses</h4>
        {programData.courses.map(data => (
          <div key={Math.random()}>
            <div>Course Component</div>
            <div>{data.courseName}</div>
            <div>{data.courseDesc}</div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProgramViewContainer;
