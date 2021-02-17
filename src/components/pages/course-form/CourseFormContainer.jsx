import React from 'react';
import { Layout, Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log({ values });
  };

  const handleChange = () => {
    form.setFieldsValue({ modules: [] });
  };

  return (
    <Space direction="vertical" align="baseline">
      <h1>Course Form</h1>
      <Form
        form={form}
        name="dynamic_course_form"
        onFinish={onFinish}
        autoComplete="off"
      >
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
          rules={[{ required: true, message: 'Missing Course Name' }]}
        >
          <Input.TextArea style={{ resize: 'none' }} rows={2} cols={2} />
        </Form.Item>

        <Form.List name="modules">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.modules !== curValues.modules
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Module"
                        name={[field.name, 'module']}
                        rules={[{ required: true, message: 'Missing module!' }]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    )}
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Module
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
