import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CourseCard = styled(Card)`
  margin-bottom: 4%;
`;

const courseData = [
  {
    courseName: 'Python Basics',
  },
  {
    courseName: 'Problem Solving',
  },
  {
    courseName: 'Time and Space Complexity',
  },
];

const CourseViewContainer = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div>
        {courseData.map(course => (
          <CourseCard
            key={Math.random()}
            title={course.courseName}
          ></CourseCard>
        ))}
        ;
      </div>
      <div>
        <Card title="ViewCourseStream">
          <span onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ? 'more' : 'less'}
            View Course Stream
          </span>
        </Card>
        <Card title="ViewCourseStream">
          <span onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ? 'more' : 'less'}
            View Course Calendar
          </span>
        </Card>
        <Card title="ViewCourseStream">
          <span onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ? 'more' : 'less'}
            View Course Notifications
          </span>
        </Card>
      </div>
    </>
  );
};

export default CourseViewContainer;
