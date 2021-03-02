import React, { useEffect } from 'react';
import { Card } from 'antd';
import { GhostLink } from '../../common';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { makeEditProgramPath, makeViewProgramPath } from '../../../routes';
import { useUserRole } from '../../hooks';

const DashboardViewContainer = () => {
  const { Meta } = Card;

  const history = useHistory();

  //Redux State Managers
  const dispatch = useDispatch();
  const { programs } = useSelector(state => state.programs);
  const { userIsAdmin } = useUserRole();

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
        userIsAdmin() ? (
          <Card
            key={program.programId}
            style={{ width: 300, margin: '10px' }}
            actions={[
              <GhostLink to={makeEditProgramPath(program.programId)}>
                <EditOutlined key={program.programId + 'edit'} />
              </GhostLink>,
              <DeleteOutlined
                key={program.programId + 'delete'}
                onClick={() => deleteProgram(program.programId)}
              />,
            ]}
          >
            <GhostLink to={makeViewProgramPath(program.programId)}>
              <Meta
                key={program.programId + 'meta'}
                title={program.programName}
                description={program.programDescription}
              />
            </GhostLink>
          </Card>
        ) : (
          <Card key={program.programId} style={{ width: 300, margin: '10px' }}>
            <GhostLink to={makeViewProgramPath(program.programId)}>
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
