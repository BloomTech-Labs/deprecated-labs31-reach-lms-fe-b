import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Button } from 'antd';
import { GhostLink, GhostLink as Link } from '../../common';
import { makeEditModulePath } from '../../../routes';
import {
  EditOutlined,
  DownOutlined,
  UpOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { modulesActions } from '../../../state/ducks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Component Styles
const ModuleCard = styled(Card)`
  margin-bottom: 4%;
`;

const Description = styled.div`
  margin-bottom: 2%;
`;

const ModuleViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //Props passed from CourseView Component
  const { moduleName, moduleDescription, moduleContent, moduleId } = props;

  const deleteModule = moduleId => {
    dispatch(modulesActions.deleteModuleThunk(moduleId));
    history.push('/');
  };

  return (
    <ModuleCard
      title={moduleName}
      extra={
        <>
          <Button
            className="card-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded ? <DownOutlined /> : <UpOutlined />}
          </Button>
          <Link to={makeEditModulePath(moduleId)}>
            <Button className="card-button">
              <EditOutlined />
            </Button>
          </Link>
          <Button
            className="card-button"
            onClick={() => deleteModule(moduleId)}
          >
            <DeleteOutlined />
          </Button>
        </>
      }
    >
      {/* If expanded button is clicked, show module information, otherwise collapse card */}
      {isExpanded && (
        <>
          {/* <Button className="module-delete-button" onClick={() => deleteModule(moduleId)}>
            <DeleteOutlined />
          </Button> */}
          <Description>{moduleDescription}</Description>
          <div>{moduleContent}</div>
        </>
      )}
    </ModuleCard>
  );
};

export default ModuleViewContainer;
