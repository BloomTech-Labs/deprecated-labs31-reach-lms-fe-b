import React from 'react';
import { Form, Input } from 'antd';
import { FormWrapper } from '../../common';

const ModuleFormInnards = ({ onChange }) => (
  <>
    <Form.Item
      name="moduleName"
      label="Module Name"
      rules={[{ required: true, message: 'Module name is required.' }]}
      onChange={onChange}
    >
      <Input name="moduleName" />
    </Form.Item>
    <Form.Item
      name="moduleDescription"
      label="Module Description"
      rules={[{ required: true, message: 'Module description is required.' }]}
      onChange={onChange}
    >
      <Input.TextArea name="moduleDescription" />
    </Form.Item>
    <Form.Item
      name="moduleContent"
      label="Module Content"
      rules={[{ required: true }]}
      onChange={onChange}
    >
      <Input.TextArea name="moduleContent" />
    </Form.Item>
  </>
);

export default ({ form, onChange, onFinish }) => {
  return (
    <>
      <FormWrapper form={form} onFinish={onFinish}>
        <ModuleFormInnards onChange={onChange} />
      </FormWrapper>
    </>
  );
};
