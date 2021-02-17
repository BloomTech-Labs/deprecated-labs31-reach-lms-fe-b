import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useResetFormOnCloseModal } from './useResetFormOnCloseModal';

// Module Form Container component
export default ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({ form, visible });

  const onOk = () => {
    form.submit();
  };

  const onChange = evt => {
    const { name, value } = evt.target;
    form.setFieldsValue({ [name]: value });
  };

  return (
    <Modal
      title="Module Modal"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <h1>Module</h1>
      <Form form={form} name="moduleForm" layout="vertical" size="large">
        <Form.Item
          name="modulename"
          label="Module Name"
          rules={[{ required: true, message: 'Module name is required.' }]}
          onChange={onChange}
        >
          <Input name="modulename" />
        </Form.Item>
        <Form.Item
          name="moduledescription"
          label="Module Description"
          rules={[
            { required: true, message: 'Module description is required.' },
          ]}
          onChange={onChange}
        >
          <Input.TextArea name="moduledescription" />
        </Form.Item>
        <Form.Item
          name="modulecontent"
          label="Module Content"
          rules={[{ required: true }]}
          onChange={onChange}
        >
          <Input.TextArea name="modulecontent" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
