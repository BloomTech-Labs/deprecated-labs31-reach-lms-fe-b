import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Space, Select, Button } from 'antd';

import { CourseForm, CourseCard } from '../course-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { userActions } from '../../../state/ducks/userDuck';

export default props => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { program, status } = useSelector(state => state.programs);
  const userid = useSelector(state => state.user?.user?.userid);

  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      // if id is defined, then we are editing this program
      // in that case, we should populate values with the existing program
      dispatch(programsActions.getProgramThunk(id));
    }
    dispatch(userActions.loginThunk());
  }, [id, dispatch]);
  useEffect(() => {
    if (status === 'success') {
      form.setFieldsValue({ ...program });
    }
  }, [status, form, program]);

  const showClassModal = () => setModalVisible(true);
  const hideClassModal = () => setModalVisible(false);

  const onFinish = values => {
    if (id) {
      console.log({ values });
      dispatch(
        programsActions.editProgramThunk({
          ...values,
          programId: id,
          students: [],
          teachers: [],
          admin: { userid },
        })
      );
    } else {
      console.log({ ADD_SUBMIT: values });
      const validProgram = {
        ...values,
        students: [],
        teachers: [],
        admin: { userid },
      };
      dispatch(programsActions.addProgramThunk(validProgram));
    }
  };

  const onCourseAdd = newClass => {
    const existingClasses = form.getFieldValue('courses') || [];
    form.setFieldsValue({
      courses: [...existingClasses, newClass],
    });
    setModalVisible(false);
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
        // onOk={onCourseAdd}
        onCancel={hideClassModal}
      >
        <CourseForm isWrapped={true} onSubmit={onCourseAdd} />
      </Modal>
    </Space>
  );
};
