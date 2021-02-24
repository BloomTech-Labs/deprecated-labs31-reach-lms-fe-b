import React, { useEffect } from 'react';
import { CourseCard } from '../course-form';

export default props => {
  const { courses, triggerEdit, triggerDelete } = props;

  useEffect(() => {
    console.log({ courses });
  }, [courses]);

  return (
    <>
      {courses && courses.length > 0 ? (
        courses.map(course => {
          const { coursename, coursedescription, courseid, ...rest } = course;
          return (
            <li key={course.courseid}>
              <CourseCard
                id={courseid}
                course={course}
                triggerEdit={triggerEdit}
                triggerDelete={() => triggerDelete(courseid)}
                {...rest}
              />
            </li>
          );
        })
      ) : (
        <p>No courses yet!</p>
      )}
    </>
  );
};
