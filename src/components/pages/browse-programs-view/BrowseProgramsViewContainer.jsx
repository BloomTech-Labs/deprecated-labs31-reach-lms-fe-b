import React from 'react';
import { Card } from 'antd';

const fakeProgramData = [
  {
    program_name: 'Intro to Python',
    program_type: 'Programming',
  },
  {
    program_name: 'Pre-Calculus',
    program_type: 'Education K-12',
  },
  {
    program_name: 'Intro to Java',
    program_type: 'Programming',
  },
  {
    program_name: 'Calculus I',
    program_type: 'Education K-12',
  },
  {
    program_name: 'CS: Intro to Data Structures',
    program_type: 'Programming',
  },
  {
    program_name: 'Information Technology Certification',
    program_type: 'Training',
  },
];

const DashboardViewContainer = () => {
  return (
    <div>
      {fakeProgramData.map(program => {
        return <Card title={program.program_name}>{program.program_type}</Card>;
      })}
    </div>
  );
};
