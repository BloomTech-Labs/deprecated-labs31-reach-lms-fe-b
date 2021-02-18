import React, { useEffect } from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';

const DashboardViewContainer = () => {
  const { Meta } = Card;

  //Redux State Managers
  const dispatch = useDispatch();
  const { programs } = useSelector(state => state.programs);

  useEffect(() => {
    dispatch(programsActions.getAllProgramsThunk());
  }, [dispatch]);

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
      {programs.map(program => {
        const { programId } = program[0];
        return (
          <GhostLink to={`/program/view/${programId}`}>
            <Card
              key={programId}
              style={{ width: 300, margin: '10px' }}
              actions={[
                <GhostLink to={`/program/edit/${programId}`}>
                  <EditOutlined key={programId + 'edit'} />
                </GhostLink>,
                <SettingOutlined key={programId + 'setting'} />,
                <EllipsisOutlined key={programId + 'ellipsis'} />,
              ]}
            >
              <Meta
                key={program[0].programId + 'meta'}
                title={program[0].programName}
                description={program[0].programDescription}
              />
            </Card>
          </GhostLink>
        );
      })}
    </div>
  );
};

export default DashboardViewContainer;
