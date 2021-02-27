import React from 'react';
import { Form } from 'antd';

export default ({ form, onFinish, children }) => {
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name="moduleForm"
        layout="vertical"
        size="large"
      >
        {children}
      </Form>
    </>
  );
};
