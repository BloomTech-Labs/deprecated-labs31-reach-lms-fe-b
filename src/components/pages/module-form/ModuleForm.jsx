import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'antd';
import { modulesActions } from '../../../state/ducks';
import { FormWrapper } from '../../common';
import { useResetFormOnCloseModal } from '../../hooks';
import ModuleFormInnards from './ModuleFormInnards';

export default props => {
  /**
   * PROPS
   *
   * id: the id of the module in question (or undefined)
   * onFinish: the function to call when ModuleForm submits
   * cancelEdit:
   * moduleToEdit: the module we should edit! (populates form state)
   * modalVisible:
   * isWrapped:
   * children: any children this component might render.
   */
  const {
    id,
    onFinish,
    onCancel,
    moduleToEdit,
    modalVisible,
    isWrapped,
    children,
  } = props;

  /** Reusable useForm hook from Ant Design */
  const [form] = Form.useForm();
  /** de-structure form methods for ease of access */
  const { getFieldsValue, setFieldsValue, resetFields } = form;
  /** allows us to dispatch actions to the redux store */
  const dispatch = useDispatch();
  /** selects module & status from our modules slice of state */
  const { module, status } = useSelector(state => state.modules);
  /** should reset the form fields as ModuleForm toggles visibility */
  useResetFormOnCloseModal({ resetFields, visible: modalVisible });
  /**
   * If we have an ID, we want to get our modules information from the backend
   * so we can populate this form
   */
  useEffect(() => {
    if (id) {
      dispatch(modulesActions.getModuleThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'success') {
      setFieldsValue({
        ...getFieldsValue(),
        ...module,
      });
    }
    if (moduleToEdit) {
      setFieldsValue({
        ...getFieldsValue(),
        ...moduleToEdit,
      });
    }
  }, [status, module, moduleToEdit, setFieldsValue, getFieldsValue]);

  const onChange = evt => {
    const { name, value } = evt.target;
    form.setFieldsValue({ [name]: value });
  };

  const onOk = () => {
    const values = getFieldsValue();
    onFinish(values);
  };

  if (isWrapped) {
    return (
      <Modal
        title="Module Modal"
        visible={modalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <FormWrapper name="moduleForm" form={form} onFinish={onFinish}>
          <ModuleFormInnards onChange={onChange} />
        </FormWrapper>
      </Modal>
    );
  }

  return (
    <>
      <FormWrapper form={form} onFinish={onFinish}>
        {children}
        <ModuleFormInnards onChange={onChange} />
      </FormWrapper>
    </>
  );
};
