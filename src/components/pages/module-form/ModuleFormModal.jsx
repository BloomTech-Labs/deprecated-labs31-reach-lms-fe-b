import React from 'react';
import { Form, Modal } from 'antd';
import { useResetFormOnCloseModal } from '../../hooks/useResetFormOnCloseModal';
import { ModuleForm } from './';

export default ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({ resetFields: form.resetFields, visible });

  const onChange = evt => {
    const { name, value } = evt.target;
    form.setFieldsValue({ [name]: value });
  };

  const onOk = values => {
    onSubmit(form.getFieldsValue());
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
