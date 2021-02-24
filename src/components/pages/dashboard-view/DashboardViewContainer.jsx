import React, { useEffect } from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { makeEditProgramPath } from '../../../routes';

const DashboardViewContainer = () => {
  const { Meta } = Card;

  const history = useHistory();

  //Redux State Managers
  const dispatch = useDispatch();
  const { programs } = useSelector(state => state.programs);
  const { role } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(programsActions.getAllProgramsThunk());
  }, [dispatch]);

  const deleteProgram = programId => {
    dispatch(programsActions.deleteProgramThunk(programId));
    history.push('/');
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        textAlign: 'left',
      }}
      key="app-container"
    >
      {programs.map(program =>
        role === 'ADMIN' ? (
          <Card
            key={program.programId}
            style={{ width: 300, margin: '10px' }}
            actions={[
              // <GhostLink to={`/program/edit/${program.programId}`}>
              <GhostLink to={makeEditProgramPath(program.programId)}>
                <EditOutlined key={program.programId + 'edit'} />
              </GhostLink>,
              <SettingOutlined key={program.programId + 'setting'} />,
              <DeleteOutlined
                key={program.programId + 'delete'}
                onClick={() => deleteProgram(program.programId)}
              />,
            ]}
          >
            <GhostLink to={`/program/view/${program.programId}`}>
              <Meta
                key={program.programId + 'meta'}
                title={program.programName}
                description={program.programDescription}
              />
            </GhostLink>
          </Card>
        ) : (
          <Card key={program.programId} style={{ width: 300, margin: '10px' }}>
            <GhostLink to={`/program/view/${program.programId}`}>
              <Meta
                key={program.programId + 'meta'}
                title={program.programName}
                description={program.programDescription}
              />
            </GhostLink>
          </Card>
        )
      )}
    </div>
  );
};

export default DashboardViewContainer;
