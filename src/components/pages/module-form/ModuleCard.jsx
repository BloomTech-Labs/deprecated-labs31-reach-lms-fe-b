import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default ({
  moduleName,
  moduleDescription,
  moduleId,
  moduleContent,
  triggerDelete,
}) => {
  return (
    <Card
      title={moduleName}
      actions={[
        <GhostLink to={`/module/edit/${moduleId}`}>
          <EditOutlined />
        </GhostLink>,
        <DeleteOutlined onClick={() => triggerDelete(moduleId)} />,
      ]}
    >
      {moduleDescription}
    </Card>
  );
};
