import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Space, Select, Button } from 'antd';
import { CourseForm } from '../course-form';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks/programsDuck';
import { coursesActions } from '../../../state/ducks/coursesDuck';
import ListCourseCards from './ListCourseCards';

const {
  getProgramThunk,
  getProgramCoursesThunk,
  editProgramThunk,
  addProgramThunk,
} = programsActions;
const { deleteCourseThunk } = coursesActions;

export default props => {
  const { push } = useHistory();

  /** The id of the program. Undefined if adding new program */
  const { id } = useParams();
  const dispatch = useDispatch();
  /** if ID is defined, we'll populate this form with the
   * contents of `program` as soon as `status === "success"` */
  const {
    program, // top level program info
    programCourses, // all courses associated with this program (if any)
    statusAdd,
    statusGet,
    statusEdit,
    statusGetCourses,
  } = useSelector(state => state.programs);

  /** AntD reusable form hook */
  const [form] = Form.useForm();
  /** Determines whether the sub-form modal is visible. Initializes to false */
  const [modalVisible, setModalVisible] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);

  useEffect(() => {
    // if id is defined, then we are editing this program
    // in that case, we should populate values with the existing program
    if (id) {
      dispatch(getProgramThunk(id)); // get top-level program info
      dispatch(getProgramCoursesThunk(id)); // get courses associated with this program
    }
  }, [id, dispatch, form]);

  useEffect(() => {
    if (statusGet === 'success') {
      form.setFieldsValue({
        ...program,
        courses: [...form.getFieldValue('courses')],
      });
    }
    if (statusGetCourses === 'success') {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        courses: programCourses,
      });
    }
    if (statusEdit === 'success' || statusAdd === 'success') {
      form.resetFields();
      push('/');
    }
  }, [
    statusGet,
    statusGetCourses,
    statusEdit,
    statusAdd,
    programCourses,
    form,
    program,
    push,
  ]);

  useEffect(() => {
    console.log({ formValues: form.getFieldsValue() });
  }, [form]);

  // just helper functions to show and hide the COURSE FORM modal
  const showCourseModal = () => setModalVisible(true);
  const hideCourseModal = () => setModalVisible(false);

  const onFinish = values => {
    const existingCourses = form.getFieldValue('courses') || [];

    if (id) {
      // if id is defined, we must hit the EDIT PROGRAM endpoint
      const validEditedProgram = {
        ...values,
        courses: existingCourses,
        programId: parseInt(id), // the id of the program to update!
        students: program.students || [], // stretch: could implement adding students
        teachers: program.teachers || [], // stretch: could implement adding teachers
      };
      dispatch(editProgramThunk(validEditedProgram));
    } else {
      // else we must just be creating a new program
      const validProgram = {
        ...values,
        students: [], // stretch: could implement adding students
        teachers: [], // stretch: could implement adding students
      };
      dispatch(addProgramThunk(validProgram));
    }
  };

  const onCourseAdd = newClass => {
    const existingClasses = form.getFieldValue('courses') || [];

    form.setFieldsValue({
      courses: [...existingClasses, newClass],
    });

    hideCourseModal();
  };

  const onCourseRemove = courseToRemove => {
    const { courseid } = courseToRemove;

    console.log({ courseid });
    const existingClasses = form.getFieldValue('courses');

    if (courseid) {
      dispatch(deleteCourseThunk(courseid));
      form.setFieldsValue({
        courses: existingClasses.filter(course => course.courseid !== courseid),
      });
    } else {
      console.log('FILTERING');
      let updated = existingClasses.filter(
        course => course.coursecode !== courseToRemove.coursecode
      );
      console.log({ updated });
      form.setFieldsValue({
        ...form.getFieldsValue(),
        courses: updated,
      });
    }
  };

  const onCourseEdit = editedClass => {
    const existingCourses = form.getFieldValue('courses') || [];
    form.setFieldsValue({
      courses: existingCourses.map(existingCourse => {
        if (existingCourse.courseid !== editedClass.courseid) {
          return existingCourse;
        } else {
          return editedClass;
        }
      }),
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
        form={form}
        name="programForm"
        initialValues={program}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        {/* PROGRAM NAME */}
        <Form.Item
          name="programName"
          label="Program Name"
          rules={[{ required: true, message: 'Missing Program Name' }]}
        >
          <Input />
        </Form.Item>

        {/* Program Type */}
        <Form.Item
          name="programType"
          label="Program Type"
          rules={[{ required: true, message: 'Missing Program Type' }]}
        >
          <Select defaultValue="edu_k12">
            <Select.Option value="edu_k12">Education (K-12)</Select.Option>
            <Select.Option value="edu_higher">Education (Higher)</Select.Option>
            <Select.Option value="training">Training</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        {/* Program Description */}
        <Form.Item name="programDescription" label="Program Description">
          <Input.TextArea />
        </Form.Item>

        {/* List of Course Cards for Each Course in This Program */}
        {/* <Form.Item
          name="courses"
          label="Course List"
          shouldUpdate={(prev, current) => {
            console.log({ prev: prev.courses, current: current.courses });
            let soUpdate = (prev.courses.length !== current.courses.length);
            console.log({ soUpdate });
            return soUpdate;
          }}
        >
          {({ getFieldValue }) => {
            let courses = getFieldValue("courses");
            console.log({ courses });
            return (

              (getFieldValue("courses")?.length > 0)
                ?
                getFieldValue("courses").map(course => {
                  console.log("INSIDE MAP", { course });
                  const { coursename, coursedescription, courseid, coursecode, ...rest } = course;
                  return (
                    <li key={`${courseid}~${coursecode}`}>
                      <CourseCard
                        id={courseid}
                        course={course}
                        triggerEdit={() => triggerEdit(course)}
                        triggerDelete={() => onCourseRemove(course)}
                        {...rest}
                      />
                    </li>
                  );
                })
                : <p>No courses yet!</p>
            );
          }}
        </Form.Item> */}
        <Form.Item
          shouldUpdate={(prev, current) => prev.courses !== current.courses}
        >
          {/* <ListCourseCards
            courses={form.getFieldValue("courses") || []}
            triggerEdit={triggerEdit}
            triggerDelete={onCourseRemove}
          /> */}
          {() => (
            <ListCourseCards
              courses={form.getFieldValue('courses')}
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
