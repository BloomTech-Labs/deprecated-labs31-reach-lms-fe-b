import React from 'react';
import { Form, Modal } from 'antd';
import { useResetFormOnCloseModal } from '../../hooks/useModalHooks';
import { ModuleForm } from './';

export default props => {
  const { visible, onCancel, onSubmit } = props;

  const [form] = Form.useForm();
  const { resetFields, setFieldsValue, getFieldsValue } = form;

  useResetFormOnCloseModal({ resetFields, visible });

  const onChange = evt => {
    const { name, value } = evt.target;
    setFieldsValue({ [name]: value });
  };

  const onOk = values => {
    onSubmit(getFieldsValue());
    form.submit();
  };

  return (
    <Modal
      title="Module Modal"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <h1>Module</h1>
      <ModuleForm form={form} onChange={onChange} />
    </Modal>
  );
};
