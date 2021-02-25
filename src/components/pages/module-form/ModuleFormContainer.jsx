import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useResetFormOnCloseModal } from '../../hooks/useResetFormOnCloseModal';
import { useParams } from 'react-router-dom';
import { modulesActions } from '../../../state/ducks/modulesDuck';
import { useDispatch, useSelector } from 'react-redux';
import { ModuleFormModal, ModuleForm } from '.';

// ModuleFormContainer component
// props come from CourseFormContainer
export default ({
  isWrapped,
  moduleId,
  moduleToEdit,
  visible,
  onCancel,
  onSubmit,
}) => {
  let { id } = useParams();
  if (isWrapped) {
    id = moduleId;
  }

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { module, status } = useSelector(state => state.modules);

  useEffect(() => {
    if (id) {
      dispatch(modulesActions.getModuleThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isWrapped) {
      form.setFieldsValue({ ...moduleToEdit });
    } else if (status === 'get/success') {
      form.setFieldsValue({ ...module });
    }
  }, [status, module, form, isWrapped, moduleToEdit]);

  // this hook will reset fields whenever user closes the modal
  const resetFields = () => form.resetFields();
  useResetFormOnCloseModal({ resetFields, visible });

  //this will run if modal is submitted
  const onOk = values => {
    if (isWrapped) {
      onSubmit({ ...form.getFieldsValue(), moduleId });
    } else if (id) {
      // pass these fields UP to CourseFormContainer
      dispatch(
        modulesActions.editModuleThunk({
          ...form.getFieldsValue(),
          moduleId: id,
        })
      );
    }
    form.submit();
  };

  const onChange = evt => {
    const { name, value } = evt.target;
    form.setFieldsValue({ [name]: value });
  };

  return (
    <>
      {/* <ModuleFormModal visible={visible} onOk={onOk} onCancel={onCancel} /> */}
      <Modal
        title="Module Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <h1>Module</h1>
        <ModuleForm form={form} onChange={onChange} />
      </Modal>
    </>
  );
};
