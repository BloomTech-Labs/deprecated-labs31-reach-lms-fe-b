import React from 'react';
import { Card } from 'antd';

// Very Simple Module Card Component
// This will likely be made more complex
export default ({ modulename, moduledescription, modulecontent }) => {
  return <Card title={modulename}>{moduledescription}</Card>;
};
