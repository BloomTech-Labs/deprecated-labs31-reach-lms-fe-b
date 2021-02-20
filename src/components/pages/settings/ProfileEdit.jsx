import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { userActions } from '../../../state/ducks/userDuck';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default props => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { user, statusGet, statusEdit } = useSelector(state => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(userActions.loginThunk());
  }, [dispatch]);
  useEffect(() => {
    if (statusGet === 'success') {
      form.setFieldsValue({ ...user });
    }
  }, [statusGet, user, form]);
  useEffect(() => {
    if (statusEdit === 'success') {
      push('/settings');
    }
  }, [statusEdit, push]);

  const onFinish = values => {
    const { userid } = user;
    dispatch(userActions.updateUserThunk(userid, values));
  };

  return (
    <>
      <Form
        form={form}
        name="profileForm"
        initialValues={user}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="firstName" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item name="useremails" label="Email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
