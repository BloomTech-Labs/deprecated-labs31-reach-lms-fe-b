import React from 'react';
import { Button } from '../../common/index';
import { CourseView } from '../index';
import styled from 'styled-components';

//Styled Components
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
`;

const Container = styled.div`
  margin-bottom: 5%;
`;

//Test Data
const programData = {
  programName: 'Test Program Name',
  programType: 'Education K-12',
  programDescription: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
  at consectetur lorem donec. Venenatis tellus in metus vulputate eu
  scelerisque felis imperdiet. Sapien faucibus et molestie ac
  feugiat sed. Eget aliquet nibh praesent tristique magna sit amet
  purus."`,

  courses: [
    {
      courseid: 0,
      coursecode: '1',
      coursename: 'Test Course Name 1',
      coursedescription: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
      at consectetur lorem donec. Venenatis tellus in metus vulputate eu'`,
      modules: [
        {
          moduleId: 0,
          moduleName: 'Test Module 1',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
      ],
    },
    {
      courseid: 0,
      coursecode: '1',
      coursename: 'Test Course Name 2',
      coursedescription: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
      at consectetur lorem donec. Venenatis tellus in metus vulputate eu'`,
      modules: [
        {
          moduleId: 0,
          moduleName: 'Test Module 2',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
        {
          moduleId: 0,
          moduleName: 'Test Module 2',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
      ],
    },
  ],
};

const ProgramViewContainer = props => {
  return (
    <>
      {/*Course Title Section*/}
      <TitleContainer>
        <div>
          <h2>{programData.programName}</h2>
          <h3>{programData.programType}</h3>
        </div>
        <div>
          <Button buttonText="Edit" />
        </div>
      </TitleContainer>

      {/*Course Description Section*/}
      <Container>{programData.programDescription}</Container>

      {/*Render Course Components Section*/}
      <Container>
        <h4>Courses</h4>
        {programData.courses.map(data => (
          <CourseView
            key={Math.random()}
            courseName={data.coursename}
            courseDescription={data.coursedescription}
            modules={data.modules}
          />
        ))}
      </Container>
    </>
  );
};

export default ProgramViewContainer;
