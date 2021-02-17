import React, { useState } from 'react';
import { DashWrapper } from '../dash-wrapper';
import { CourseForm } from './';

export default props => {
  return (
    <DashWrapper>
      <CourseForm />
    </DashWrapper>
  );
};
