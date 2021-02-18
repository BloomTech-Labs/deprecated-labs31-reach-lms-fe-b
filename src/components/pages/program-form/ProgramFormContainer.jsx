import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Space, Select, Button } from 'antd';

import { CourseForm, CourseCard } from '../course-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';

export default props => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { program, status } = useSelector(state => state.programs);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      // if id is defined, then we are editing this program
      // in that case, we should populate values with the existing program
      dispatch(programsActions.getProgramThunk(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (status === 'success') {
      form.setFieldsValue({ ...program });
    }
  }, [status, form, program]);

  const showClassModal = () => setModalVisible(true);
  const hideClassModal = () => setModalVisible(false);

  const onFinish = values => {
    console.log({ values });
  };

  const onCourseAdd = newClass => {
    const existingClasses = form.getFieldValue('courses') || [];
    form.setFieldsValue({
      courses: [...existingClasses, newClass],
    });
    setModalVisible(false);
    console.log(form.getFieldValue('courses'));
  };

  const onOk = values => {
    console.log({ onOk: values });
  };

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <h1>Program Form</h1>
      <Form
        form={form}
        name="programForm"
        initialValues={program}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="programName"
          label="Program Name"
          rules={[{ required: true, message: 'Missing Program Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="programType" label="Program Type">
          <Select defaultValue="edu_k12">
            <Select.Option value="edu_k12">Education (K-12)</Select.Option>
            <Select.Option value="edu_higher">Education (Higher)</Select.Option>
            <Select.Option value="training">Training</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="programDescription" label="Program Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="courses" label="Course List">
          {form.getFieldValue('courses')?.length > 0 ? (
            form
              .getFieldValue('courses')
              .map(
                (
                  { coursename, coursedescription, courseid, ...rest },
                  index
                ) => (
                  <li key={index}>
                    <CourseCard
                      key={index}
                      id={courseid}
                      name={coursename}
                      description={coursedescription}
                      {...rest}
                    />
                  </li>
                )
              )
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
        <CourseForm isWrapped={true} onSubmit={onCourseAdd} />
      </Modal>
    </Space>
  );
};
