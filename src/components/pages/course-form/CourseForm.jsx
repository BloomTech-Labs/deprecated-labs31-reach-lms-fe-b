import React from 'react';
import { Form, Input, Button } from 'antd';
import ListModuleCards from './ListModuleCards';
import { FormWrapper } from '../../common';

const CourseFormInnards = ({
  getFieldValue,
  showModuleModal,
  triggerEdit,
  onModuleRemove,
}) => (
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

    <Form.Item
      label="Modules"
      shouldUpdate={(prev, current) => prev.modules !== current.modules}
    >
      {() => {
        return (
          <ListModuleCards
            modules={getFieldValue('modules')}
            triggerEdit={triggerEdit}
            triggerDelete={onModuleRemove}
          />
        );
      }}
    </Form.Item>

    <Form.Item>
      <Button htmlType="button" onClick={showModuleModal}>
        Add Module
      </Button>
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form.Item>
  </>
);

export default ({
  form,
  onFinish,
  onModuleRemove,
  triggerEdit,
  showModuleModal,
  children,
}) => {
  const { getFieldValue } = form;

  return (
    <>
      <FormWrapper name={'courseForm'} form={form} onFinish={onFinish}>
        {children}

        <CourseFormInnards
          getFieldValue={getFieldValue}
          onModuleRemove={onModuleRemove}
          triggerEdit={triggerEdit}
          showModuleModal={showModuleModal}
        />
      </FormWrapper>
    </>
  );
};
