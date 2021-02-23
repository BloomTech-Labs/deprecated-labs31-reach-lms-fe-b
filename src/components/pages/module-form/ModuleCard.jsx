import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default props => {
  const {
    moduleName,
    moduleDescription,
    moduleId,
    module,
    triggerEdit,
    triggerDelete,
  } = props;

  if (triggerEdit) {
    return (
      <Card
        title={moduleName}
        actions={[
          <EditOutlined onClick={() => triggerEdit(module)} />,
          <DeleteOutlined onClick={() => triggerDelete(module)} />,
        ]}
      >
        {moduleDescription}
      </Card>
    );
  }
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
