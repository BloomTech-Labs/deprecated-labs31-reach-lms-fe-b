import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { ModuleView } from '../view-module';
import { useDispatch, useSelector } from 'react-redux';
import { coursesActions } from '../../../state/ducks/coursesDuck';
import { useUserRole } from '../../hooks';
import {
  DownOutlined,
  UpOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { Button } from 'antd';
import { GhostLink as Link } from '../../common';

import styled from 'styled-components';
import { makeEditCoursePath } from '../../../routes';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const modules = useSelector(state => state.courses.modules[courseid]);

  const { userIsAdmin, userIsTeacher } = useUserRole();

  //Dispatch Action to Load Program Info
  useEffect(() => {
    dispatch(coursesActions.getCourseModulesThunk2(courseid));
  }, [courseid, dispatch]);

  const deleteCourse = courseid => {
    dispatch(coursesActions.deleteCourseThunk(courseid));
    history.push('/');
  };

  return (
    <>
      <CourseCard
        title={courseName}
        extra={
          <>
            <Button
              className="card-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {!isExpanded ? <DownOutlined /> : <UpOutlined />}
            </Button>
            {// if user is ADMIN -or- TEACHER, they should have
            // the ability to EDIT or DELETE this course
            (userIsAdmin() || userIsTeacher()) && (
              <>
                <Link to={makeEditCoursePath(courseid, programId)}>
                  <Button className="card-button">
                    <EditOutlined />
                  </Button>
                </Link>
                <Button
                  className="card-button"
                  onClick={() => deleteCourse(courseid)}
                >
                  <DeleteOutlined />
                </Button>
              </>
            )}
          </>
        }
      >
        {/* If expanded button is clicked, show course information, otherwise collapse card */}
        {isExpanded && (
          <>
            <Description>{courseDescription}</Description>
            {/* Maps over course module data and renders ModuleView components*/}
            {modules?.map(module => (
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
