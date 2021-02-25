import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import ListCourseCards from './ListCourseCards';

export default ({
  onCourseRemove,
  getFieldValue,
  triggerEdit,
  showCourseModal,
}) => {
  return (
    <>
      {/* PROGRAM NAME */}
      <Form.Item
        name="programName"
        label="Program Name"
        rules={[{ required: true, message: 'Missing Program Name' }]}
      >
        <Input />
      </Form.Item>

      {/* Program Type */}
      <Form.Item
        name="programType"
        label="Program Type"
        rules={[{ required: true, message: 'Missing Program Type' }]}
      >
        <Select defaultValue="edu_k12">
          <Select.Option value="edu_k12">Education (K-12)</Select.Option>
          <Select.Option value="edu_higher">Education (Higher)</Select.Option>
          <Select.Option value="training">Training</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      {/* Program Description */}
      <Form.Item name="programDescription" label="Program Description">
        <Input.TextArea />
      </Form.Item>

      {/* List of Course Cards for Each Course in This Program */}
      <Form.Item
        shouldUpdate={(prev, current) => prev.courses !== current.courses}
      >
        {() => (
          <ListCourseCards
            courses={getFieldValue('courses')}
            triggerDelete={onCourseRemove}
            triggerEdit={triggerEdit}
          />
        )}
      </Form.Item>

      {/* Add Class Button. On click will pull up ADD COURSE FORM (in a modal) */}
      <Form.Item>
        <Button htmlType="button" onClick={showCourseModal}>
          Add Course
        </Button>
      </Form.Item>

      {/* SUBMIT BUTTON */}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};
