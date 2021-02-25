import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { ModuleForm } from '.';
import { DashWrapper } from '../dash-wrapper';
import { modulesActions } from '../../../state/ducks/modulesDuck';

export default props => {
  let { id } = useParams();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { module, status } = useSelector(state => state.modules);

  useEffect(() => {
    dispatch(modulesActions.getModuleThunk(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'success') {
      form.setFieldsValue({ ...module });
    }
  }, [status, form, module]);

  const onFinish = values => {
    dispatch(modulesActions.addModuleThunk({ ...values, moduleId: id }));
  };

  const onChange = evt => {
    const { name, value } = evt.target;
    form.setFieldsValue({ [name]: value });
  };

  return (
    <DashWrapper>
      <h1>Edit Module</h1>
      <ModuleForm form={form} onFinish={onFinish} onChange={onChange} />
    </DashWrapper>
  );
};
