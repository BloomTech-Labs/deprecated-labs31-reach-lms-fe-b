import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const ModuleCard = styled(Card)`
  margin-bottom: 4%;
`;

const Description = styled.div`
  margin-bottom: 2%;
`;

const ModuleViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { moduleName, moduleDescription, moduleContent } = props;

  return (
    <ModuleCard
      key={Math.random()}
      title={moduleName}
      extra={
        <span onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded ? 'more' : 'less'}
        </span>
      }
    >
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
