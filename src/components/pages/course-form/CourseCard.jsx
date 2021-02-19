import React from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GhostLink } from '../../common';

export default ({ name, description, id, ...restProps }) => {
  return (
    <Card
      title={name}
      actions={[
        <GhostLink to={`/course/edit/${id}`}>
          <EditOutlined />
        </GhostLink>,
      ]}
    >
      {description}
    </Card>
  );
};
