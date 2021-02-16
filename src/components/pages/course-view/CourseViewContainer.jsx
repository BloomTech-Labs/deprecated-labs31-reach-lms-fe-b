import React, { useState } from 'react';
import { Card } from 'antd';
import { ModuleView } from '../index';
import styled from 'styled-components';

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
  const { courseName, courseDescription, modules } = props;

  return (
    <>
      <CourseCard
        key={Math.random()}
        title={courseName}
        extra={
          <span onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ? 'more' : 'less'}
          </span>
        }
      >
        {/* If expanded button is clicked, show course information, otherwise collapse card */}
        {isExpanded && (
          <>
            <Description>{courseDescription}</Description>
            {/* Maps over course module data and renders ModuleView components*/}
            {modules.map(module => (
              <ModuleView
                key={module.moduleId}
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
