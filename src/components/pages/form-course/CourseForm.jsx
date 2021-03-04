import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coursesActions, modulesActions } from '../../../state/ducks';
import { Modal, Form, Button } from 'antd';
import { ModuleForm } from './../form-module';
import { FormWrapper } from '../../common';
import { useSubModal, useResetFormOnCloseModal } from '../../hooks';
import CourseFormInnards from './CourseFormInnards';
import ListModuleCards from './ListModuleCards';

/**
 * COURSE FORM
 * This component manages the creation or editing of a Course
 * Rendered by CourseFormPage and ProgramForm
 */
export default props => {
  /**
   * PROPS
   *
   * id: the id of the course in question (or undefined)
   * onFinish: the function to call on CourseForm submit
   * courseToEdit: the course we should edit! (populates form state)
   * children: any children this component should render
   */
  const {
    id,
    onFinish,
    cancelEdit,
    courseToEdit,
    modalVisible,
    isWrapped,
    children,
  } = props;

  /** reusable form hook from ant design */
  const [form] = Form.useForm();
  /** destructuring functions from form for ease of access */
  const { getFieldsValue, getFieldValue, setFieldsValue, resetFields } = form;
  /** allows us to edit a module regardless of whether it exists in database yet */
  const [moduleToEdit, setModuleToEdit] = useState(null);

  // Redux
  /** allows us to dispatch actions to the Redux store */
  const dispatch = useDispatch();
  /** selects course & status from our course slice of state */
  const { course, status } = useSelector(state => state.courses);
  /**
   * visible {boolean}: denotes whether module modal is open
   * hideModal: function to close modal
   * showModal: function to show modal
   */
  const { visible, hideModal, showModal } = useSubModal();

  /** should reset form fields as CourseFormModal opens and closes */
  useResetFormOnCloseModal({ resetFields, visible: modalVisible });

  /**
   * dispatches calls to backend api to populate form data if ID exists
   */
  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCourseThunk(id));
      dispatch(coursesActions.getCourseModulesThunk(id));
    }
  }, [id, dispatch]);

  /**
   * if status hits "get/success", we know our Redux store
   * has updated course information and we can set our form state
   * to the populated data
   */
  useEffect(() => {
    if (status === 'get/success') {
      setFieldsValue({
        ...getFieldsValue(),
        ...course,
      });
    }
    if (courseToEdit) {
      setFieldsValue({
        ...getFieldsValue(),
        ...courseToEdit,
      });
    }
  }, [status, course, courseToEdit, getFieldsValue, setFieldsValue]);

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
    const { moduleId } = moduleToEdit;

    editedModule = { ...editedModule, moduleId };

    const mapById = module =>
      module.moduleId === moduleId ? editedModule : module;
    const mapByName = module =>
      module.moduleName === editedModule.moduleName ? editedModule : module;

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
    if (moduleId) {
      // if the module exists in DB, we need to delete it
      dispatch(modulesActions.deleteModuleThunk(moduleId));
    }
    // if we can filter by `moduleId`, we'll do that
    const filterById = module => module.moduleId !== moduleId;
    // otherwise we'll filter by `moduleName`
    const filterByName = module => module.moduleName !== moduleName;
    // make a copy of our existing modules
    const existingModules = getFieldValue('modules') || [];

    // set our modules property to a filtered version of what it is
    // filter by ID if moduleId exists, otherwise filter by name
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

  /**
   * If a user clicks `cancel` on the module modal, we want to set our `
   * moduleToEdit` back to null b/c they clearly don't want to edit anymore.
   * Additionally, hide the modal to close it.
   */
  const cancelModuleEdit = () => {
    setModuleToEdit(null);
    hideModal();
  };

  /**
   * This is the submit function for when this course form is wrapped in a modal.
   * This function will get our form's values and pass them up to the
   * `onFinish` function passed down from ProgramFormContainer
   */
  const onOk = () => {
    const modules = getFieldValue('modules');
    const values = getFieldsValue();
    onFinish({ ...values, modules });
  };

  /**
   * *************************************************
   * NOTE: THIS IS NOT A RETURN STATEMENT YET
   * *************************************************
   *
   * This function is a utility function that will be used inside of our return statement.
   * It holds all of the most complex pieces of this form that WILL BE USED NO MATTER WHAT
   *
   * The return statement handles a tiny bit of logic to decide whether we will wrap what this
   * returns in a Modal or not.
   *
   * This function is the meat behind this component, but it's important to understand
   * that the RETURN IS STILL BELOW ALL OF THIS
   */
  const innerForm = () => (
    <>
      {children}

      {/* All the top-level course fields that don't relate to modules*/}
      <CourseFormInnards />

      {/* List of Module Cards (with EDIT or DELETE optionality)
      These will update any time the `modules` property changes in our form state */}
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

      {/* This allows users to add a module to our Course; pulls up the module form modal */}
      <Form.Item>
        <Button htmlType="button" onClick={showModal}>
          Add Module
        </Button>
      </Form.Item>

      {/* Module Form allows us to Create or Edit a Module (whether it's in the database yet or not)
        - `onFinish` will be `onModuleEdit` if our `moduleToEdit` piece of state is defined, 
        otherwise it will be `onModuleAdd`
        - `moduleToEdit` will be our piece of state if it exists or `undefined` if it's still `null`
      */}
      <ModuleForm
        isWrapped={true}
        onFinish={moduleToEdit ? onModuleEdit : onModuleAdd}
        onCancel={cancelModuleEdit}
        moduleToEdit={moduleToEdit ?? undefined}
        modalVisible={visible}
      />
    </>
  );

  /**
   * *************************************************
   * FINALLY, THE RETURN LOGIC
   * *************************************************
   */
  if (isWrapped) {
    // if our CourseForm is wrapped, we need to wrap all the JSX elements above in a Modal
    return (
      <Modal
        title="Course Modal"
        visible={modalVisible}
        onOk={onOk}
        onCancel={cancelEdit}
      >
        <FormWrapper name="courseForm" form={form} onFinish={onFinish}>
          {// note: innerForm returns all the Form JSX above
          innerForm()}
        </FormWrapper>
      </Modal>
    );
  } else {
    // otherwise, our CourseForm is NOT wrapped, so we need to just return
    // all the above JSX but with a Submit button to give users submission power
    return (
      <FormWrapper name="courseForm" form={form} onFinish={onOk}>
        {// note: innerForm returns all the Form JSX above
        innerForm()}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </FormWrapper>
    );
  }
};
