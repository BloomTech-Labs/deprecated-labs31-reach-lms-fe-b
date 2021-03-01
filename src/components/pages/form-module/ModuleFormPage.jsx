import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModuleForm } from '.';
import { DashWrapper } from '../view-dash-wrapper';
import { modulesActions } from '../../../state/ducks';

export default props => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const onFinish = values => {
    dispatch(modulesActions.addModuleThunk({ ...values, moduleId: id }));
  };

  return (
    <DashWrapper>
      <h1>Edit Module</h1>
      <ModuleForm id={id} onFinish={onFinish} />
    </DashWrapper>
  );
};
