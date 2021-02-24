import React, { useEffect } from 'react';
import { CourseCard } from '../course-form';

export default ({ courses, triggerEdit, triggerDelete }) => {
  useEffect(() => {
    console.log({ courses });
  }, [courses]);

  return (
    <>
      {courses && courses.length > 0 ? (
        courses.map(course => {
          const {
            coursename,
            coursedescription,
            courseid,
            coursecode,
            ...rest
          } = course;
          return (
            <li key={`${courseid}~${coursecode}`}>
              <CourseCard
                id={courseid}
                course={course}
                triggerEdit={() => triggerEdit(course)}
                triggerDelete={() => triggerDelete(course)}
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
