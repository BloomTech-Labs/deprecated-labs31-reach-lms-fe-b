import React from 'react';
import { Form } from 'antd';

export default ({ name, form, onFinish, children, ...rest }) => {
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name={name}
        layout="vertical"
        size="large"
        {...rest}
      >
        {children}
      </Form>
    </>
  );
};
