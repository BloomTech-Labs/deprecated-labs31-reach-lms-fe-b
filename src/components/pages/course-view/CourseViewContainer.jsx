import React, { useState } from 'react';
import { Card } from 'antd';
import { ModuleView } from '../index';
import styled from 'styled-components';

const CourseCard = styled(Card)`
  margin-bottom: 4%;
`;

const Description = styled.div`
  margin-bottom: 2%;
`;

const CourseViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        {isExpanded && (
          <>
            <Description>{courseDescription}</Description>
            {modules.map(module => (
              <ModuleView
                key={Math.random()}
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
