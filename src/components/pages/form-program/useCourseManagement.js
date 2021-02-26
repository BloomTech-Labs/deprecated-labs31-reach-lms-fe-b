import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { programsActions } from '../../../state/ducks';
import { useHistory } from 'react-router-dom';
const { getProgramThunk, getProgramCoursesThunk } = programsActions;

export const useProgramRedux = (id, formUtils) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { program, programCourses, status } = useSelector(
    state => state.programs
  );

  useEffect(() => {
    if (id) {
      dispatch(getProgramThunk(id));
      dispatch(getProgramCoursesThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const {
      setFieldsValue,
      getFieldValue,
      getFieldsValue,
      resetFields,
    } = formUtils;

    if (status === 'get/success') {
      setFieldsValue({
        ...program,
        courses: [...getFieldValue('courses')],
      });
    }
    if (status === 'get-courses/success') {
      setFieldsValue({
        ...getFieldsValue(),
        courses: programCourses,
      });
    }
    if (status === 'edit/success' || status === 'add/success') {
      resetFields();
      push('/');
    }
  }, [status, programCourses, program, formUtils, push]);
};
