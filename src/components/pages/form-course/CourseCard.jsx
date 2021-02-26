import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GhostLink } from '../../common';

export default ({ course, triggerEdit, triggerDelete, ...restProps }) => {
  const { coursename, courseid, coursedescription } = course;
  if (triggerEdit) {
    return (
      <Card
        title={coursename}
        actions={[
          <EditOutlined onClick={triggerEdit} />,
          <DeleteOutlined onClick={triggerDelete} />,
        ]}
        {...restProps}
      >
        {coursedescription}
      </Card>
    );
  }
  return (
    <Card
      title={coursename}
      actions={[
        <GhostLink to={`/course/edit/${courseid}`}>
          <EditOutlined />
        </GhostLink>,
      ]}
    >
      {coursedescription}
    </Card>
  );
};
