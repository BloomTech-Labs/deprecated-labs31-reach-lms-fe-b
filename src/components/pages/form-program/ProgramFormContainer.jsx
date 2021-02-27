import React, { useState } from 'react';
import { Button, Form, Space } from 'antd';
import { CourseForm } from '../form-course';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions, coursesActions } from '../../../state/ducks';
import ProgramFormInnards from './ProgramFormInnards';
import ListCourseCards from './ListCourseCards';
import { useProgramRedux } from './useCourseManagement';

const { editProgramThunk, addProgramThunk } = programsActions;
const { deleteCourseThunk } = coursesActions;

export default props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { program } = useSelector(state => state.programs);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);

  const { setFieldsValue, getFieldValue, getFieldsValue, resetFields } = form;

  useProgramRedux(id, {
    setFieldsValue,
    getFieldValue,
    getFieldsValue,
    resetFields,
  });

  const showCourseModal = () => setModalVisible(true);
  const hideCourseModal = () => setModalVisible(false);

  const onFinish = values => {
    const existingCourses = getFieldValue('courses') || [];

    if (id) {
      const validEditedProgram = {
        ...values,
        courses: existingCourses,
        programId: parseInt(id),
        students: program.students || [],
        teachers: program.teachers || [],
      };
      dispatch(editProgramThunk(validEditedProgram));
    } else {
      const validProgram = {
        ...values,
        courses: existingCourses,
        students: [],
        teachers: [],
      };
      dispatch(addProgramThunk(validProgram));
    }
  };

  const onCourseAdd = newClass => {
    setFieldsValue({
      courses: [...getFieldValue('courses'), newClass],
    });
    hideCourseModal();
  };

  const onCourseRemove = courseToRemove => {
    const { courseid, coursecode } = courseToRemove;

    const filterById = course => course.courseid !== courseid;
    const filterByCode = course => course.coursecode !== coursecode;

    if (courseid) {
      dispatch(deleteCourseThunk(courseid));
    }

    setFieldsValue({
      courses: getFieldValue('courses').filter(
        courseid ? filterById : filterByCode
      ),
    });
  };

  const onCourseEdit = editedCourse => {
    editedCourse = { ...editedCourse, courseid: courseToEdit.courseid };

    if (editedCourse?.courseid) {
      dispatch(coursesActions.editCourseThunk(editedCourse));
    }

    setFieldsValue({
      courses: getFieldValue('courses').map(course =>
        course.courseid === editedCourse.courseid ? editedCourse : course
      ),
    });
    setCourseToEdit(null);
    hideCourseModal();
  };

  const triggerEdit = course => {
    setCourseToEdit(course);
    showCourseModal();
  };

  const cancelEdit = () => {
    setCourseToEdit(null);
    hideCourseModal();
  };

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <h1>Program Form</h1>

      {/* PROGRAM ADD/EDIT FORM */}
      <Form
        name="programForm"
        form={form}
        initialValues={program}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <ProgramFormInnards
          getFieldValue={getFieldValue}
          onCourseRemove={onCourseRemove}
          showCourseModal={showCourseModal}
          triggerEdit={triggerEdit}
        />

        {/* List of Course Cards for Each Course in This Program */}
        <Form.Item
          shouldUpdate={(prev, current) => prev.courses !== current.courses}
        >
          {() => (
            <ListCourseCards
              courses={getFieldValue('courses')}
              triggerDelete={onCourseRemove}
              triggerEdit={triggerEdit}
            />
          )}
        </Form.Item>

        {/* Add Class Button. On click will pull up ADD COURSE FORM (in a modal) */}
        <Form.Item>
          <Button htmlType="button" onClick={showCourseModal}>
            Add Course
          </Button>
        </Form.Item>

        {/* SUBMIT BUTTON */}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* This modal will display if user clicks "ADD COURSE"  */}
      {courseToEdit ? (
        <CourseForm
          isWrapped={true}
          modalVisible={modalVisible}
          onFinish={onCourseEdit}
          id={courseToEdit.courseid}
          cancelEdit={cancelEdit}
          courseToEdit={courseToEdit}
        />
      ) : (
        <CourseForm
          isWrapped={true}
          modalVisible={modalVisible}
          onFinish={onCourseAdd}
          cancelEdit={cancelEdit}
        />
      )}
    </Space>
  );
};
