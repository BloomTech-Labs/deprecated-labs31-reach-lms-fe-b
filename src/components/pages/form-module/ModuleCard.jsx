import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

/**
 * This is a ModuleCard that will be displayed within our CourseForm.
 * When a user goes to create or edit a course, they will be able to add Modules to that course.
 * As modules are added or populated in the course, we need to give our user
 * the ability to EDIT or DELETE those modules.
 */
export default props => {
  /**
   * PROPS
   *
   * name: name of the module
   * description: description of the module
   * triggerEdit (callable Function): function to fire if user wants to edit this module
   * triggerDelete (callable Function): function to fire if user wants to delete this module
   */
  const { name, description, triggerEdit, triggerDelete } = props;

  return (
    <Card
      title={name}
      actions={[
        <EditOutlined onClick={triggerEdit} />,
        <DeleteOutlined onClick={triggerDelete} />,
      ]}
    >
      {description}
    </Card>
  );
};
