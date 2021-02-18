import React from 'react';
import { Form } from 'antd';

export default ({ onChange, fields, children, ...restProps }) => {
  return (
    <Form
      fields={fields}
      onFieldsChange={(x, allFields) => {
        onChange(allFields);
      }}
      {...restProps}
    >
      {children}
    </Form>
  );
};
