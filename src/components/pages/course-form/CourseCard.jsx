import React from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GhostLink } from '../../common';

export default ({ course, triggerEdit, ...restProps }) => {
  const { coursename, courseid, coursedescription } = course;
  if (triggerEdit) {
    return (
      <Card
        title={coursename}
        actions={[<EditOutlined onClick={() => triggerEdit(course)} />]}
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
