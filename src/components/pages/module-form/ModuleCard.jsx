import React from 'react';
import { Card } from 'antd';

export default ({ modulename, moduledescription, modulecontent }) => {
  return <Card title={modulename}>{moduledescription}</Card>;
};
