import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coursesActions, modulesActions } from '../../../state/ducks';
import { Form, Button } from 'antd';
import { ModuleFormModal } from './../module-form';
import { FormWrapper } from '../../common';
import { useSubModal } from '../../hooks';
import CourseFormInnards from './CourseFormInnards';
import ListModuleCards from './ListModuleCards';

export default props => {
  // props
  const { id, onFinish, children } = props;

  // form
  const [form] = Form.useForm();
  const { getFieldsValue, getFieldValue, setFieldsValue } = form;
  const [moduleToEdit, setModuleToEdit] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const { course, status } = useSelector(state => state.courses);
  const { visible, hideModal, showModal } = useSubModal();

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCourseThunk(id));
      dispatch(coursesActions.getCourseModulesThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'get/success') {
      setFieldsValue({
        ...getFieldsValue(),
        ...course,
      });
    }
  }, [status, course, getFieldsValue, setFieldsValue]);

  /**
   * Add a new module to our form state.
   * This module will be created in teh database when the user
   * submits this course form
   *
   * @param {Module} newModule — the module to create
   */
  const onModuleAdd = newModule => {
    const existingModules = getFieldValue('modules') || [];

    setFieldsValue({
      modules: [...existingModules, newModule],
    });

    hideModal();
  };

  /**
   * Edits the given module in our form state.
   * If it's a module that exists in the database, we will
   * call [EDIT module by id] endpoint.
   *
   * @param {Module} editedModule — The module to be updated
   */
  const onModuleEdit = editedModule => {
    const { moduleId, moduleName } = editedModule;

    const mapById = module =>
      module.moduleId === moduleId ? editedModule : module;
    const mapByName = module =>
      module.moduleName === moduleName ? editedModule : module;

    if (moduleId) {
      dispatch(modulesActions.editModuleThunk(editedModule));
    }

    const existingModules = getFieldValue('modules') || [];

    setFieldsValue({
      modules: existingModules.map(moduleId ? mapById : mapByName),
    });

    hideModal();
  };

  /**
   * Removes the given module from our form state.
   * If it's a module that exists, we will call [DELETE module by id] endpoint
   *
   * @param {Module} moduleToDelete — The module that needs to be deleted
   */
  const onModuleRemove = moduleToDelete => {
    const { moduleId, moduleName } = moduleToDelete;

    const filterById = module => module.moduleId !== moduleId;
    const filterByName = module => module.moduleName !== moduleName;

    if (moduleId) {
      dispatch(modulesActions.deleteModuleThunk(moduleId));
    }

    const existingModules = form.getFieldValue('modules') || [];

    setFieldsValue({
      modules: existingModules.filter(moduleId ? filterById : filterByName),
    });
  };

  /**
   * Triggers the editing ability for a module. This is necessary
   * if we want to edit any modules that don't yet exist in the database.
   *
   * @param {Module} module — The module to edit
   */
  const triggerEdit = module => {
    setModuleToEdit(module);
    showModal();
  };

  return (
    <>
      <FormWrapper name={'courseForm'} form={form} onFinish={onFinish}>
        {children}

        {/* All the top-level course fields that don't relate to modules */}
        <CourseFormInnards />

        {/* List of Module Cards (with EDIT or DELETE optionality) */}
        <Form.Item
          label="Modules"
          shouldUpdate={(prev, current) => prev.modules !== current.modules}
        >
          {() => (
            <ListModuleCards
              modules={getFieldValue('modules')}
              triggerEdit={triggerEdit}
              triggerDelete={onModuleRemove}
            />
          )}
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
          visible={visible}
        ></ModuleFormModal>
      ) : (
        <ModuleFormModal
          onSubmit={onModuleAdd}
          visible={visible}
        ></ModuleFormModal>
      )}
    </>
  );
};
