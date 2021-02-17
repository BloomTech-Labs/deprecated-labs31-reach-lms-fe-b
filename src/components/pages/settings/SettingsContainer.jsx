import React from 'react';
import { Card } from 'antd';

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
  return (
    <div className="Profile">
      {data.map(info => (
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
      ))}
    </div>
  );
};

export default SettingsProfile;
