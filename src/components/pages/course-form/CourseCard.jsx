import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';

export default ({ name, description, ...restProps }) => {
  const { courseid } = restProps;
  return (
    <GhostLink to={`/course/edit/${courseid}`}>
      <Card title={name}>{description}</Card>
    </GhostLink>
  );
};
