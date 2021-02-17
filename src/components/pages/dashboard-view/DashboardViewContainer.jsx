import React from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { VIEW_PROGRAM_PATH } from '../../../routes/';

const fakeData = [
  {
    programid: Math.random().toString(),
    program_name: 'Intro to Computer Science',
    program_type: 'education_higher',
    program_description: 'this is a test cs description',
  },
  {
    programid: Math.random().toString(),
    program_name: 'Intro to Python',
    program_type: 'education_higher',
    program_description: 'this is a test for python decscription',
  },
  {
    programid: Math.random().toString(),
    program_name: 'Pre-Calculus',
    program_type: 'education_k12',
    program_description: 'this is a test for pre-calc',
  },
  {
    programid: Math.random().toString(),
    program_name: 'Information Technology Certification',
    program_type: 'training',
    program_description: 'this is a test for IT certification',
  },
  {
    programid: Math.random().toString(),
    program_name: 'Microsoft Excel - From Beginner to Expert',
    program_type: 'training',
    program_description: 'this is a test for excel training',
  },
  {
    programid: Math.random().toString(),
    program_name: 'The Complete Digital Marketing Course',
    program_type: 'other',
    program_description: 'this is a test for digital marketing',
  },
];

const DashboardViewContainer = () => {
  const { Meta } = Card;

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
      }}
      key="app-container"
    >
      {fakeData.map(program => (
        <GhostLink to={VIEW_PROGRAM_PATH}>
          <Card
            key={program.program_id}
            style={{ width: 300, margin: '10px' }}
            actions={[
              <SettingOutlined key={program.programid + 'setting'} />,
              <EditOutlined key={program.programid + 'edit'} />,
              <EllipsisOutlined key={program.programid + 'ellipsis'} />,
            ]}
          >
            <Meta
              key={program.programid + 'meta'}
              title={program.program_name}
              description={program.program_description}
            />
          </Card>
        </GhostLink>
      ))}
    </div>
  );
};

export default DashboardViewContainer;
