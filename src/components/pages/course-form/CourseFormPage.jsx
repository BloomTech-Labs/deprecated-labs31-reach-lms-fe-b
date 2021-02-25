import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CourseForm from './CourseForm';
import { Select, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  programsActions,
  coursesActions,
  modulesActions,
} from '../../../state/ducks';

export default props => {
  const { id, programId } = useParams();
  const { push } = useHistory();
  const [form] = Form.useForm();
  const { getFieldsValue, getFieldValue, setFieldsValue } = form;

  const { programs } = useSelector(state => state.programs);
  const dispatch = useDispatch();

  const { course, status } = useSelector(state => state.courses);
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCourseThunk(id));
      dispatch(coursesActions.getCourseModulesThunk(id));
    }
    dispatch(programsActions.getAllProgramsThunk());
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'get/success') {
      setFieldsValue({ ...getFieldsValue(), ...course });
      // if (programId) {
      //   setFieldsValue({ ...getFieldsValue(), programSelected: programId });
      // }
    }
    if (status === 'edit/success' || status === 'add/success') {
      push('/');
    }
  }, [status, course, getFieldsValue, setFieldsValue]);

  const onFinish = values => {
    const validNewCourse = {
      ...values,
      program: { programId: values.programSelected },
    };

    console.log(validNewCourse);
    if (id) {
      const validEditedCourse = {
        ...values,
        program: { programId },
        courseid: id,
      };

      dispatch(coursesActions.editCourseThunk(validEditedCourse));
    } else {
      dispatch(coursesActions.addCourseThunk(validNewCourse));
    }
  };

  //Module Handlers
  const showModuleModal = () => setModalVisible(true);
  const hideModuleModal = () => setModalVisible(false);

  const onModuleAdd = newModule => {
    const existingModules = form.getFieldValue('modules') || [];

    form.setFieldsValue({
      modules: [...existingModules, newModule],
    });
    hideModuleModal();
  };

  const onModuleEdit = editedModule => {
    const existingModules = form.getFieldValue('modules') || [];
    //look into editing module that doesn't exist in DB, like Programs
    form.setFieldsValue({
      modules: existingModules.map(module =>
        module.moduleId === editedModule.moduleId ? editedModule : module
      ),
    });

    hideModuleModal();
  };

  const triggerEdit = module => {
    setModuleToEdit(module);
    showModuleModal();
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
    <CourseForm
      form={form}
      onFinish={onFinish}
      triggerEdit={triggerEdit}
      onModuleRemove={onModuleRemove}
    >
      <Form.Item
        name="programSelected"
        label="Associated Program"
        rules={programId ? [{ required: false }] : [{ required: true }]}
      >
        <Select
          name="program"
          placeholder="Select a Program"
          defaultValue={parseInt(programId)}
          disabled={id}
        >
          {programs.map(programIn => (
            <Select.Option value={programIn.programId}>
              {programIn.programName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </CourseForm>
  );
};
