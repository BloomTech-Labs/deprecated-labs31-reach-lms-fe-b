import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Button } from 'antd';
import { GhostLink as Link } from '../../common';

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
  const { moduleName, moduleDescription, moduleContent, moduleId } = props;

  return (
    <ModuleCard
      title={moduleName}
      extra={
        <>
          {/* <Button onClick={() => setIsExpanded(!isExpanded)}>
              {!isExpanded ? '+' : '-'}
            </Button>
            <Link to={`/module/edit/${moduleId}`}>
              <Button>Edit</Button>
            </Link> */}
        </>
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
