import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Space, Button, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { coursesActions } from '../../../state/ducks/coursesDuck';
import { modulesActions } from '../../../state/ducks/modulesDuck';
import { ModuleForm } from '../module-form';
import ListModuleCards from './ListModuleCards';

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
  const { programs } = useSelector(state => state.programs);
  const { course, statusGet } = useSelector(state => state.courses);
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
    if (statusGet === 'success') {
      form.setFieldsValue({ ...form.getFieldsValue(), ...course });
    }
  }, [statusGet, course, form, isWrapped, courseToEdit]);

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
      modules: existingModules.map(existingModule => {
        if (existingModule.moduleId !== editedModule.moduleId) {
          return existingModule;
        } else {
          return editedModule;
        }
      }),
    });

    hideModuleModal();
  };

  const triggerEdit = module => {
    setModuleToEdit(module);
    showModuleModal();
  };

  const onModuleRemove = moduleToDelete => {
    const { moduleId, moduleName } = moduleToDelete;
    const existingModules = form.getFieldValue('modules');
    if (moduleId) {
      dispatch(modulesActions.deleteModuleThunk(moduleId));
      form.setFieldsValue({
        modules: existingModules.filter(module => module.moduleId !== moduleId),
      });
    } else {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        modules: existingModules.filter(
          module => module.moduleName !== moduleName
        ),
      });
    }
  };

  return (
    <StyledSpace direction="vertical" align="center">
      <h1>Course Form</h1>
      <Form
        form={form}
        name="courseForm"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        {!isWrapped && (
          <Form.Item
            name="programSelected"
            label="Associated Program"
            rules={[{ required: true }]}
          >
            <Select name="program" placeholder="Select a Program">
              {/* <Select.Option value="--default--">Please Select a Program</Select.Option> */}
              {programs.map(program => {
                return (
                  <Select.Option value={program.programId}>
                    {program.programName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

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
          rules={[{ required: true, message: 'Missing Course Description' }]}
        >
          <Input.TextArea style={{ resize: 'none' }} rows={2} cols={2} />
        </Form.Item>

        <Form.Item
          label="Modules"
          shouldUpdate={(prev, current) => prev.modules !== current.modules}
        >
          {() => {
            return (
              <ListModuleCards
                modules={form.getFieldValue('modules')}
                triggerEdit={triggerEdit}
                triggerDelete={onModuleRemove}
              />
            );
          }}
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={showModuleModal}>
            Add Module
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {moduleToEdit ? (
        <ModuleForm
          visible={modalVisible}
          onCancel={hideModuleModal}
          onSubmit={onModuleEdit}
          moduleToEdit={moduleToEdit}
          moduleId={moduleToEdit.moduleId}
          isWrapped={true}
        />
      ) : (
        <ModuleForm
          visible={modalVisible}
          onCancel={hideModuleModal}
          onSubmit={onModuleAdd}
          isWrapped={true}
        />
      )}
    </StyledSpace>
  );
};
