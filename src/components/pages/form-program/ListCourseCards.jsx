import React from 'react';
import { CourseCard } from '../form-course';

export default ({ courses, triggerEdit, triggerDelete }) => {
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
