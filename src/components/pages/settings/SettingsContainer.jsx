import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  margin: 0 24px;
`;

const data = [
  {
    firstName: 'Wayne',
    lastName: 'Abbruscato',
    email: 'lambda@school.com',
    phone: '340-151-3246',
  },
  {
    firstName: 'Lord',
    lastName: 'Helmet',
    email: 'spaceballs@schwarz.com',
    phone: '802-555-7951',
  },
];

const SettingsProfile = props => {
  // const { info } = props;
  const info = data[0]; //this will be removed
  return (
    <SettingsWrapper className="Profile">
      <Card title="Profile">
        <div className="image-container">
          <img src=" " alt="" height="100px" width="100px" />
        </div>
        <div className="Info-container">
          <h2>{info.firstName}</h2>
          <h2>{info.lastName}</h2>
          <h2>{info.email}</h2>
          <h2>{info.phone}</h2>
        </div>
      </Card>
      {/* {data.map(info => (
      ))} */}
    </SettingsWrapper>
  );
};

export default SettingsProfile;
