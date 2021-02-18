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
import { VIEW_PROGRAM_PATH } from '../../../routes/';

const DashboardViewContainer = () => {
  const { Meta } = Card;

  //Redux State Managers
  const dispatch = useDispatch();
  const { programs } = useSelector(state => state.programs);
  const { role } = useSelector(state => state.user);

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
      {programs.map(program =>
        role === 'ADMIN' ? (
          <GhostLink to={`/program/view/${program[0].programId}`}>
            <Card
              key={program[0].programId}
              style={{ width: 300, margin: '10px' }}
              actions={[
                <GhostLink to={`/program/edit/${program[0].programId}`}>
                  <EditOutlined key={program[0].programId + 'edit'} />
                </GhostLink>,
                <SettingOutlined key={program[0].programId + 'setting'} />,
                <EllipsisOutlined key={program[0].programId + 'ellipsis'} />,
              ]}
            >
              <Meta
                key={program[0].programId + 'meta'}
                title={program[0].programName}
                description={program[0].programDescription}
              />
            </Card>
          </GhostLink>
        ) : (
          <GhostLink to={`/program/view/${program[0].programId}`}>
            <Card
              key={program[0].programId}
              style={{ width: 300, margin: '10px' }}
            >
              <Meta
                key={program[0].programId + 'meta'}
                title={program[0].programName}
                description={program[0].programDescription}
              />
            </Card>
          </GhostLink>
        )
      )}
    </div>
  );
};

export default DashboardViewContainer;
