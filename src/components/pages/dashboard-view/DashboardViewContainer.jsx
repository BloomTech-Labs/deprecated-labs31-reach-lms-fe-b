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
import styled from 'styled-components';

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
          <GhostLink to={`/program/view/${program.programId}`}>
            <Card
              key={program.programId}
              style={{ width: 300, margin: '10px' }}
              actions={[
                <GhostLink to={`/program/edit/${program.programId}`}>
                  <EditOutlined key={program.programId + 'edit'} />
                </GhostLink>,
                <SettingOutlined key={program.programId + 'setting'} />,
                <EllipsisOutlined key={program.programId + 'ellipsis'} />,
              ]}
            >
              <Meta
                key={program.programId + 'meta'}
                title={program.programName}
                description={program.programDescription}
              />
            </Card>
          </GhostLink>
        ) : (
          <GhostLink to={`/program/view/${program.programId}`}>
            <Card
              key={program.programId}
              style={{ width: 300, margin: '10px' }}
            >
              <Meta
                key={program.programId + 'meta'}
                title={program.programName}
                description={program.programDescription}
              />
            </Card>
          </GhostLink>
        )
      )}
    </div>
  );
};

export default DashboardViewContainer;
