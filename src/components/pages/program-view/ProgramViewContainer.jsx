import React, { useEffect } from 'react';
import { Button } from '../../common/index';
import { CourseView } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { programsActions } from '../../../state/ducks/programsDuck';
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
  //Program Id passed from Main Dash param in url
  const { id } = useParams();

  //Redux State Managers
  const dispatch = useDispatch();

  const { programName, programDescription, programType, courses } = useSelector(
    state => state.programs.program
  );

  //Dispatch Action to Load Program Info
  useEffect(() => {
    dispatch(programsActions.getProgramThunk(id));
  }, []);

  return (
    <>
      {/*Course Title Section*/}
      <TitleContainer>
        <div>
          <h2>{programName}</h2>
          <h3>{programType}</h3>
        </div>
        <div>
          <Button buttonText="Edit" />
        </div>
      </TitleContainer>

      {/*Course Description Section*/}
      <Container>{programDescription}</Container>

      {/*Render Course Components Section*/}
      <Container>
        <h4>Courses</h4>

        {courses.map(courseData => (
          <CourseView
            key={courseData[0].courseid}
            courseName={courseData[0].coursename}
            courseDescription={courseData[0].coursedescription}
            modules={courseData[0].modules}
          />
        ))}
      </Container>
    </>
  );
};

export default ProgramViewContainer;
