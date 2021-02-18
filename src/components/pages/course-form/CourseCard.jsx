import React from 'react';
import { Card } from 'antd';

export default ({ name, description }) => {
  return <Card title={name}>{description}</Card>;
};
