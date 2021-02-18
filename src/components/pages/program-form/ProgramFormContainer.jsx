import React, { useState } from 'react';
import { Modal, Form, Input, Space, Select, Button } from 'antd';
import { CourseForm, CourseCard } from '../course-form';

export default props => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);

  const showClassModal = () => setModalVisible(true);
  const hideClassModal = () => setModalVisible(false);

  const onFinish = values => {
    console.log({ values });
  };

  const onClassAdd = newClass => {
    const existingClasses = form.getFieldValue('classes') || [];
    form.setFieldsValue({
      classes: [...existingClasses, newClass],
    });
    setModalVisible(false);
  };

  const onOk = () => {};

  return (
    <Space style={{ width: '100%' }}>
      <h1>Program Form</h1>
      <Form
        form={form}
        name="programForm"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="programname"
          label="Program Name"
          rules={[{ required: true, message: 'Missing Program Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="programtype" label="Program Type">
          <Select defaultValue="edu_k12">
            <Select.Option value="edu_k12">Education (K-12)</Select.Option>
            <Select.Option value="edu_higher">Education (Higher)</Select.Option>
            <Select.Option value="training">Training</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="programdescription" label="Program Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="courses" label="Course List">
          {form.getFieldValue('courses')?.length > 0 ? (
            form
              .getFieldValue('courses')
              .map(({ coursename, coursedescription }, index) => (
                <li key={index}>
                  <CourseCard
                    key={index}
                    name={coursename}
                    description={coursedescription}
                  />
                </li>
              ))
          ) : (
            <p>No courses yet!</p>
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={showClassModal}>
            Add Class
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Course Modal"
        visible={modalVisible}
        onOk={onOk}
        onCancel={hideClassModal}
      >
        <CourseForm isWrapped={true} handleSubmit={onClassAdd} />
      </Modal>
    </Space>
  );
};
