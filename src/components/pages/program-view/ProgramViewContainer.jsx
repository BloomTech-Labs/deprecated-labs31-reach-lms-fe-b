import React from 'react';
import { Button } from '../../common/index';
import { CourseView } from '../';
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

const ProgramViewContainer = props => {
  //Props passed from Program Dashboard
  const { programData } = props;

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
            key={data.courseid}
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
