import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined } from '@ant-design/icons';

export default ({ moduleName, moduleDescription, moduleId, moduleContent }) => {
  return (
    <Card
      title={moduleName}
      actions={[
        <GhostLink to={`/module/edit/${moduleId}`}>
          <EditOutlined />
        </GhostLink>,
      ]}
    >
      {moduleDescription}
    </Card>
  );
};
