import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined } from '@ant-design/icons';

export default ({ modulename, moduledescription, moduleid, modulecontent }) => {
  return (
    <Card
      title={modulename}
      actions={[
        <GhostLink to={`/module/edit/${moduleid}`}>
          <EditOutlined />
        </GhostLink>,
      ]}
    >
      {moduledescription}
    </Card>
  );
};
