import { Avatar, Button, Card, Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

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

const typeImgArr = {
  education_k12:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UAxmKUj3hhGcCKYZ_XYW2QHaE3%26pid%3DApi&f=1',
  education_higher:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.a39ARZ-_NkHD0L56BxYkowAAAA%26pid%3DApi&f=1',
  training:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.gBd8xGd6qtcrWZgtV-BAWQHaE7%26pid%3DApi&f=1',
  other:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.gBd8xGd6qtcrWZgtV-BAWQHaE7%26pid%3DApi&f=1',
};

// const StyledCard = styled(Card)`
//
// `;

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
      {fakeData.map((program) => (
        <Card
          key={program.program_id}
          style={{ width: 300, margin: '10px' }}
          cover={
            <img
              key={program.programid + 'img'}
              alt="example"
              src={typeImgArr[program.program_type]}
            />
          }
          actions={[
            <SettingOutlined key={program.programid + 'setting'} />,
            <EditOutlined key={program.programid + 'edit'} />,
            <EllipsisOutlined key={program.programid + 'ellipsis'} />,
          ]}
        >
          <Meta
            key={program.programid + 'meta'}
            // avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
            title={program.program_name}
            description={program.program_description}
          />
        </Card>
      ))}
    </div>
  );
}

export default DashboardViewContainer;
