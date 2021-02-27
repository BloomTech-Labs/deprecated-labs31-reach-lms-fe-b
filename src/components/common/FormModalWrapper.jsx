import React from 'react';
import { Modal } from 'antd';
import { useResetFormOnCloseModal } from '../hooks';

export default ({ form, visible, onCancel, onSubmit, children, ...rest }) => {
  useResetFormOnCloseModal({ resetFields: form.resetFields, visible });

  const onOk = values => {
    onSubmit(form.getFieldsValue());
    form.submit();
  };

  return (
    <>
      <Modal visible={visible} onOk={onOk} onCancel={onCancel} {...rest}>
        {children}
      </Modal>
    </>
  );
};
