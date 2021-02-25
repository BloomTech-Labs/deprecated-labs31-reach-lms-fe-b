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
  //Router
  const { id, programId } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.courses);
  const { programs } = useSelector(state => state.programs);

  useEffect(() => {
    dispatch(programsActions.getAllProgramsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'add/success' || status === 'edit/success') {
      push('/');
    }
  }, [push, status]);

  const onFinish = values => {
    const validNewCourse = {
      ...values,
      program: { programId: values.programSelected },
    };

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

  return (
    <CourseForm onFinish={onFinish}>
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
