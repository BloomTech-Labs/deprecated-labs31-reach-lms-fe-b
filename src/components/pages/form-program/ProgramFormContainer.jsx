import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import { FormWrapper } from '../../common';
import { CourseForm } from '../form-course';
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
    // get the list of our existing courses from form state
    // if undefined, we'll default to an empty array
    const existingCourses = getFieldValue('courses') || [];

    if (id) {
      // if our program has an ID, it exists in database.
      // as such, we want to edit this program.
      const validEditedProgram = {
        ...values, // spread the values coming in from form.submit
        courses: existingCourses, // make sure to put our existing courses in here
        programId: parseInt(id), // toss our ID in as our programId
        students: program.students || [],
        teachers: program.teachers || [],
      };

      // finally, we'll dispatch our thunk for PATCH Program
      dispatch(editProgramThunk(validEditedProgram));
    } else {
      // otherwise we are creating a new course
      const validProgram = {
        ...values, // spread the values coming in from form.submit
        courses: existingCourses, // make sure to put our existing courses in here
        students: [], // defaulting to no students
        teachers: [], // defaulting to no teachers
      };

      // finally, we'll dispatch our thunk for POST Program
      dispatch(addProgramThunk(validProgram));
    }
  };

  const onCourseAdd = newCourse => {
    if (newCourse?.courseid && id) {
      // if the newCourse has a `courseid` and our program has an id,
      // we want to actually post this new course with a program association
      dispatch(
        coursesActions.addCourseThunk({
          ...newCourse,
          program: { programId: id },
        })
      );
    }

    // no matter what, we want to set up our form state to hold
    // the list of courses so that we can allow the user to actually EDIT or DELETE them
    setFieldsValue({
      courses: [...getFieldValue('courses'), newCourse],
    });

    // and finally, we'll close the CourseForm modal and let the user look at the ProgramForm again
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
    <>
      <h1>Program Form</h1>
      {/* PROGRAM ADD/EDIT FORM */}
      <FormWrapper
        name="programForm"
        form={form}
        initialValues={program}
        onFinish={onFinish}
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
      </FormWrapper>

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
    </>
  );
};
