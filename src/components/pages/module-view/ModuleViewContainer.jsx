import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

//Component Styles
const ModuleCard = styled(Card)`
  margin-bottom: 4%;
`;

const Description = styled.div`
  margin-bottom: 2%;
`;

const ModuleViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  //Props passed from CourseView Component
  const { moduleId, moduleName, moduleDescription, moduleContent } = props;

  return (
    <ModuleCard
      title={moduleName}
      extra={
        <span onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded ? 'more' : 'less'}
        </span>
      }
    >
      {/* If expanded button is clicked, show module information, otherwise collapse card */}
      {isExpanded && (
        <>
          <Description>{moduleDescription}</Description>
          <div>{moduleContent}</div>
        </>
      )}
    </ModuleCard>
  );
};

export default ModuleViewContainer;
