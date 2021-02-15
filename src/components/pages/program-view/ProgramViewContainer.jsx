import React from 'react';

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
      <h2>{programData.programName}</h2>
      <h3>{programData.programType}</h3>
      <div>{programData.programDesc}</div>
      <br />
      <h4>Courses</h4>
      <div>
        {programData.courses.map(data => (
          <>
            <div>Course Component</div>
            <div>{data.courseName}</div>
            <div>{data.courseDesc}</div>
            <br />
          </>
        ))}
      </div>
    </>
  );
};

export default ProgramViewContainer;
