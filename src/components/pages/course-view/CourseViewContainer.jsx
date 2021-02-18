import React, { useState } from 'react';
import { Card } from 'antd';
import { ModuleView } from '../';
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
                key={module.moduleid}
                moduleName={module.modulename}
                moduleDescription={module.moduledescription}
                moduleContent={module.modulecontent}
              />
            ))}
          </>
        )}
      </CourseCard>
    </>
  );
};

export default CourseViewContainer;
