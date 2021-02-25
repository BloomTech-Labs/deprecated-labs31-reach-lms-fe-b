import React, { useState } from 'react';
import { Modal, Form, Space } from 'antd';
import { CourseForm } from '../course-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions, coursesActions } from '../../../state/ducks';
import ProgramFormInnards from './ProgramFormInnards';
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
    setFieldsValue({
      courses: getFieldValue('courses').map(course =>
        course.courseid === editedCourse.courseid ? editedCourse : course
      ),
    });

    hideCourseModal();
  };

  const triggerEdit = course => {
    setCourseToEdit(course);
    showCourseModal();
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
      </Form>
      {/* This modal will display if user clicks "ADD COURSE"  */}
      <Modal
        title="Course Modal"
        visible={modalVisible}
        onCancel={hideCourseModal}
      >
        {courseToEdit ? (
          <CourseForm
            isWrapped={true}
            onSubmit={onCourseEdit}
            courseId={courseToEdit.courseid}
            courseToEdit={courseToEdit}
          />
        ) : (
          <CourseForm isWrapped={true} onSubmit={onCourseAdd} />
        )}
      </Modal>
    </Space>
  );
};
