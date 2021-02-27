import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CourseForm from './CourseForm';
import { Select, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { programsActions, coursesActions } from '../../../state/ducks';

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
    if (id) {
      dispatch(
        coursesActions.editCourseThunk({
          ...values,
          program: { programId },
          courseid: id,
        })
      );
    } else {
      dispatch(
        coursesActions.addCourseThunk({
          ...values,
          program: { programId: values.programSelected },
        })
      );
    }
  };

  return (
    <CourseForm id={id} onFinish={onFinish}>
      <Form.Item
        name="programSelected"
        label="Associated Program"
        rules={[{ required: programId ? false : true }]}
      >
        <Select
          name="program"
          placeholder="Select a Program"
          defaultValue={programId ? parseInt(programId) : undefined}
          disabled={programId}
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
