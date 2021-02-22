import React, { useEffect } from 'react';
import { CourseView } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { programsActions } from '../../../state/ducks/programsDuck';
import { Button } from 'antd';
import { GhostLink as Link } from '../../common';
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

const ProgramWrapper = styled.div`
  margin: 0 24px;
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
    dispatch(programsActions.getProgramCoursesThunk(id));
  }, [id, dispatch]);

  return (
    <ProgramWrapper>
      {/*Course Title Section*/}
      <TitleContainer>
        <div>
          <h2>{programName}</h2>
          <h3>{programType}</h3>
        </div>
        <div>
          <Link to={`/program/edit/${id}`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </TitleContainer>

      {/*Course Description Section*/}
      <Container>{programDescription}</Container>

      {/*Render Course Components Section*/}
      <Container>
        <h4>Courses</h4>
        {[] &&
          courses.map(courseData => (
            <CourseView
              key={courseData.courseid}
              courseName={courseData.coursename}
              courseDescription={courseData.coursedescription}
              courseid={courseData.courseid}
            />
          ))}
      </Container>
    </ProgramWrapper>
  );
};

export default ProgramViewContainer;
