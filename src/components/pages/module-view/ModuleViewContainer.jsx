import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const ModuleCard = styled(Card)`
  margin-bottom: 6%;
`;

//Test Data
const moduleData = [
  {
    moduleName: 'Python Basics',
    moduleTopics: [
      {
        moduleTopicName: 'Warmup',
        moduleTopicContent: 'Test Description 12345',
      },
      {
        moduleTopicName: 'Use Print Statement',
        moduleTopicContent: 'Test Description 12345',
      },
      {
        moduleTopicName: 'List Operations',
        moduleTopicContent: 'Test Description 12345',
      },
    ],
  },
  {
    moduleName: 'Linked Lists',
    moduleTopics: [
      {
        moduleTopicName: 'Warmup',
        moduleTopicContent: 'Test Description 12345',
      },
      {
        moduleTopicName: 'Use Print Statement',
        moduleTopicContent: 'Test Description 12345',
      },
      {
        moduleTopicName: 'List Operations',
        moduleTopicContent: 'Test Description 12345',
      },
    ],
  },
];

const ModuleViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  return moduleData.map(module => (
    <ModuleCard title={module.moduleName}>
      {module.moduleTopics.map(topic => (
        <Card
          type="inner"
          title={topic.moduleTopicName}
          extra={
            <span onClick={() => setIsExpanded(!isExpanded)}>
              {!isExpanded ? 'more' : 'less'}
            </span>
          }
        >
          {isExpanded && topic.moduleTopicContent}
        </Card>
      ))}
    </ModuleCard>
  ));
};

export default ModuleViewContainer;
