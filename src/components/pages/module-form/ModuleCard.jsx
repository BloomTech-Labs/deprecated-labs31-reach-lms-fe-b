import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default ({
  moduleId,
  name,
  description,
  triggerEdit,
  triggerDelete,
}) => {
  if (triggerEdit) {
    return (
      <Card
        title={name}
        actions={[
          <EditOutlined onClick={triggerEdit} />,
          <DeleteOutlined onClick={triggerDelete} />,
        ]}
      >
        {description}
      </Card>
    );
  }
  return (
    <Card
      title={name}
      actions={[
        <GhostLink to={`/module/edit/${moduleId}`}>
          <EditOutlined />
        </GhostLink>,
        <DeleteOutlined onClick={triggerDelete} />,
      ]}
    >
      {description}
    </Card>
  );
};
