import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleForm, ModuleCard } from '../module-form';
import styled from 'styled-components';

const StyledDivider = styled(Space)`
  &&& {
    width: 100%;
  }
`;

const FormItem = styled(Form.Item)`
  &&& {
    width: 100%;
    /* input {
      width: 90%;
    }  */
  }
`;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default props => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const showUserModal = () => setModalVisible(true);
  const hideUserModal = () => setModalVisible(false);
  // const fields = form.getFields();
  useEffect(() => {
    if (!modalVisible) {
      console.log({ form_fields: form.getFieldsValue() });
    }
  }, [modalVisible, form]);

  const onFinish = values => {
    console.log({ values });
  };

  const handleChange = () => {
    form.setFieldsValue({ modules: [] });
  };

  return (
    <StyledDivider direction="vertical" align="center">
      <h1>Course Form</h1>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === 'moduleForm') {
            console.log({ name, values, forms });
            const { courseForm } = forms;
            const modules = courseForm.getFieldValue('modules') || [];
            form.setFieldsValue({
              modules: [...modules, { ...values }],
            });
            setModalVisible(false);
            console.log(form.getFieldValue('modules'));
            console.log(form.getFieldsValue());
          }
        }}
      >
        <Form
          form={form}
          name="courseForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <FormItem
            name="coursename"
            label="Course Name"
            rules={[{ required: true, message: 'Missing Course Name' }]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="coursecode"
            label="Course Code"
            rules={[{ required: true, message: 'Missing Course Code' }]}
          >
            <Input />
          </FormItem>

          <Form.Item
            name="coursedescription"
            label="Course Description"
            rules={[{ required: true, message: 'Missing Course Name' }]}
          >
            <Input.TextArea style={{ resize: 'none' }} rows={2} cols={2} />
          </Form.Item>

          <Form.Item
            label="Module List"
            shouldUpdate={(prevValues, curValues) =>
              prevValues.modules !== curValues.modules
            }
          >
            {({ getFieldValue }) => {
              const modules = getFieldValue('modules') || [];
              return modules.length ? (
                modules.map((module, index) => (
                  <li key={index} className="module">
                    <ModuleCard {...module} />
                  </li>
                ))
              ) : (
                <p>No modules yet!</p>
              );
            }}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button htmlType="button" onClick={showUserModal}>
              Add Module
            </Button>
          </Form.Item>
        </Form>
        <ModuleForm visible={modalVisible} onCancel={hideUserModal} />
      </Form.Provider>
    </StyledDivider>
  );
};
