import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { coursesActions } from '../../../state/ducks/coursesDuck';
import { modulesActions } from '../../../state/ducks/modulesDuck';
import { ModuleFormModal } from '../module-form';
import { CourseForm } from './';

const StyledSpace = styled(Space)`
  &&& {
    width: 100%;
  }
`;

export default ({ isWrapped, onSubmit, courseId, courseToEdit }) => {
  let { id } = useParams();
  if (isWrapped) {
    id = courseId;
  }
  const { course, status } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCourseThunk(id));
      dispatch(coursesActions.getCourseModulesThunk(id));
    }
    if (!isWrapped && !id) {
      dispatch(programsActions.getAllProgramsThunk());
    }
  }, [id, dispatch, isWrapped]);

  useEffect(() => {
    if (isWrapped) {
      form.setFieldsValue({ ...courseToEdit });
    }
    if (status === 'get/success') {
      form.setFieldsValue({ ...form.getFieldsValue(), ...course });
    }
  }, [status, course, form, isWrapped, courseToEdit]);

  const showModuleModal = () => setModalVisible(true);
  const hideModuleModal = () => setModalVisible(false);

  const onFinish = values => {
    if (isWrapped) {
      onSubmit({ ...form.getFieldsValue(), courseid: courseId });
    } else if (id) {
      dispatch(coursesActions.editCourseThunk({ ...values, courseid: id }));
    } else {
      const validNewCourse = {
        ...values,
        program: { programId: values.programSelected },
      };
      console.log({ validNewCourse });
      dispatch(coursesActions.addCourseThunk(validNewCourse));
    }
  };

  const onModuleAdd = newModule => {
    const existingModules = form.getFieldValue('modules') || [];

    form.setFieldsValue({
      modules: [...existingModules, newModule],
    });
    hideModuleModal();
  };

  const onModuleEdit = editedModule => {
    const existingModules = form.getFieldValue('modules') || [];

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
    <StyledSpace direction="vertical" align="center">
      <h1>Course Form</h1>
      <CourseForm form={form} onFinish={onFinish} />
      <ModuleFormModal
        visible={modalVisible}
        onCancel={hideModuleModal}
        onSubmit={onModuleAdd}
      />
    </StyledSpace>
  );
};
