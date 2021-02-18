import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Space, Select, Button } from 'antd';
import { CourseForm, CourseCard } from '../course-form';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { useParams } from 'react-router-dom';
import { CustomForm } from '../../common/';

export default props => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { program, status } = useSelector(state => state.programs);
  // const [form] = Form.useForm();
  const [form, setCustomForm] = useState([{ ...program }]);

  useEffect(() => {
    if (id) {
      dispatch(programsActions.getProgramThunk(id));
    }
  }, [id, dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const showClassModal = () => setModalVisible(true);
  const hideClassModal = () => setModalVisible(false);

  const onFinish = values => {
    console.log({ values });
    dispatch(programsActions.postProgramThunk(form));
  };

  const onCourseAdd = newClass => {
    const existingClasses = form.courses || [];
    setCustomForm({
      courses: [...existingClasses, newClass],
    });
    setModalVisible(false);
  };

  const onOk = values => {
    console.log({ onOk: values });
  };

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <h1>Program Form</h1>
      <CustomForm
        autoComplete="off"
        layout="vertical"
        fields={form}
        onSubmit={onFinish}
        onChange={newFields => {
          setCustomForm([...form, newFields]);
        }}
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
          {form.courses?.length > 0 ? (
            form.courses.map(({ coursename, coursedescription }, index) => (
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
      </CustomForm>
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
