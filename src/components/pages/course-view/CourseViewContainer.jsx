import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { ModuleView } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { coursesActions } from '../../../state/ducks/coursesDuck';

import { Button } from 'antd';
import { GhostLink as Link } from '../../common';

import styled from 'styled-components';
import { makeEditCoursePath } from '../../../routes';

//Component Styles
const CourseCard = styled(Card)`
  margin-bottom: 4%;
`;

const Description = styled.div`
  margin-bottom: 2%;
`;

const CourseViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  //Props passed from ProgramView Component
  const { courseName, courseDescription, courseid, programId } = props;

  //Redux State Managers
  const dispatch = useDispatch();

  const modules = useSelector(state => state.courses.modules[courseid]);

  //Dispatch Action to Load Program Info
  useEffect(() => {
    dispatch(coursesActions.getCourseModulesThunk2(courseid));
  }, [courseid, dispatch]);

  return (
    <>
      <CourseCard
        title={courseName}
        extra={
          <>
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {!isExpanded ? '+' : '-'}
            </Button>
            <Link to={makeEditCoursePath(courseid, programId)}>
              <Button>Edit</Button>
            </Link>
          </>
        }
      >
        {/* If expanded button is clicked, show course information, otherwise collapse card */}
        {isExpanded && (
          <>
            <Description>{courseDescription}</Description>
            {/* Maps over course module data and renders ModuleView components*/}
            {[] &&
              modules?.map(module => (
                <ModuleView
                  key={module.moduleId}
                  moduleId={module.moduleId}
                  moduleName={module.moduleName}
                  moduleDescription={module.moduleDescription}
                  moduleContent={module.moduleContent}
                />
              ))}
          </>
        )}
      </CourseCard>
    </>
  );
};

export default CourseViewContainer;
