import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coursesActions, modulesActions } from '../../../state/ducks';
import { Form, Input, Button } from 'antd';
import CourseFormInnards from './CourseFormInnards';
import { ModuleFormModal } from './../module-form';
import ListModuleCards from './ListModuleCards';
import { FormWrapper } from '../../common';
import { useResetFormOnCloseModal } from '../../hooks';

export default ({ id, onFinish, children }) => {
  //Forms
  const [form] = Form.useForm();
  const { getFieldsValue, getFieldValue, setFieldsValue } = form;
  const [moduleToEdit, setModuleToEdit] = useState(null);

  //Redux
  const dispatch = useDispatch();
  const { course, status } = useSelector(state => state.courses);
  const { hideModal, showModal, modalVisable } = useResetFormOnCloseModal();

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCourseThunk(id));
      dispatch(coursesActions.getCourseModulesThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'get/success') {
      setFieldsValue({ ...getFieldsValue(), ...course });
    }
  }, [status, course, getFieldsValue, setFieldsValue]);

  //Module Handlers

  const onModuleAdd = newModule => {
    const existingModules = form.getFieldValue('modules') || [];

    form.setFieldsValue({
      modules: [...existingModules, newModule],
    });
    hideModal();
  };

  const onModuleEdit = editedModule => {
    const existingModules = form.getFieldValue('modules') || [];
    //look into editing module that doesn't exist in DB, like Programs

    form.setFieldsValue({
      modules: existingModules.map(module =>
        module.moduleId === editedModule.moduleId ? editedModule : module
      ),
    });

    hideModal();
  };

  const triggerEdit = module => {
    setModuleToEdit(module);
    showModal();
  };

  const onModuleRemove = moduleToDelete => {
    const { moduleId, moduleName } = moduleToDelete;

    const filterById = module => module.moduleId !== moduleId;
    const filterByName = module => module.moduleName !== moduleName;

    if (moduleId) {
      dispatch(modulesActions.deleteModuleThunk(moduleId));
    }

    const existingModules = form.getFieldValue('modules') || [];

    form.setFieldsValue({
      modules: existingModules.filter(moduleId ? filterById : filterByName),
    });
  };

  return (
    <>
      <FormWrapper name={'courseForm'} form={form} onFinish={onFinish}>
        {children}

        <CourseFormInnards />

        {/*Module Modal*/}
        <Form.Item
          label="Modules"
          shouldUpdate={(prev, current) => prev.modules !== current.modules}
        >
          {() => {
            return (
              <ListModuleCards
                modules={getFieldValue('modules')}
                triggerEdit={triggerEdit}
                triggerDelete={onModuleRemove}
              />
            );
          }}
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={showModal}>
            Add Module
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </FormWrapper>

      {moduleToEdit ? (
        <ModuleFormModal
          onSubmit={onModuleEdit}
          visible={modalVisable}
        ></ModuleFormModal>
      ) : (
        <ModuleFormModal
          onSubmit={onModuleAdd}
          visible={modalVisable}
        ></ModuleFormModal>
      )}
    </>
  );
};
