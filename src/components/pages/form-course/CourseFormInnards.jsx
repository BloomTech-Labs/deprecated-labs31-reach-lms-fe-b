import React from 'react';
import { Form, Input } from 'antd';

/**
 * These are all of the simple form elements of `CourseForm`.
 * We moved this to a separate component for reusability and readability in `CourseForm`.
 */
export default props => (
  <>
    <Form.Item
      name="coursename"
      label="Course Name"
      rules={[{ required: true, message: 'Missing Course Name' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="coursecode"
      label="Course Code"
      rules={[{ required: true, message: 'Missing Course Code' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="coursedescription"
      label="Course Description"
      rules={[{ required: true, message: 'Missing Course Description' }]}
    >
      <Input.TextArea style={{ resize: 'none' }} rows={2} cols={2} />
    </Form.Item>
  </>
);
