import React from 'react';
import { ModuleCard } from '../form-module';

export default ({ modules, triggerEdit, triggerDelete }) => {
  return (
    <>
      {modules?.length > 0 ? (
        modules.map(module => {
          const { moduleId, moduleName, moduleDescription, ...rest } = module;
          return (
            <li key={`${moduleId}`}>
              <ModuleCard
                id={moduleId}
                name={moduleName}
                description={moduleDescription}
                triggerEdit={() => triggerEdit(module)}
                triggerDelete={() => triggerDelete(module)}
                {...rest}
              />
            </li>
          );
        })
      ) : (
        <p>No modules yet!</p>
      )}
    </>
  );
};
