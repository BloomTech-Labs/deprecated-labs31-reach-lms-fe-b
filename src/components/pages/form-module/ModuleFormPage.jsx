import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TreeSelect } from 'antd';
import { ModuleForm } from '.';
import { DashWrapper } from '../dash-wrapper';
import { programsActions, modulesActions } from '../../../state/ducks';

const initTreeData = [
  { id: 1, pId: 0, value: '1', title: 'Expand to load' },
  { id: 2, pId: 0, value: '2', title: 'Expand to load' },
  { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
];

export default props => {
  const { id } = useParams();
  const { status, programs, programCourses } = useSelector(
    state => state.programs
  );
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    dispatch(programsActions.getAllProgramsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'get-all/success') {
      setTreeData(
        programs.map(program => ({
          id: program.programId,
          pId: 0,
          title: program.programTitle,
          value: program.programId,
        }))
      );
    }
  }, [status, setTreeData, programs]);

  useEffect(() => {
    console.log('TREE DATA', treeData);
  }, [treeData]);

  const onFinish = values => {
    dispatch(modulesActions.addModuleThunk({ ...values, moduleId: id }));
  };

  const onChange = value => {
    console.log({ value });
    setValue({ value });
  };

  const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random()
      .toString(36)
      .substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  const onLoadData = treeNode => {
    console.log({ treeNode });
    dispatch(programsActions.getProgramCoursesThunk(treeNode.id));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTreeData([...treeData]);
        resolve();
      }, 300);
    });
  };

  return (
    <DashWrapper>
      <h1>Edit Module</h1>
      <ModuleForm id={id} onFinish={onFinish}>
        <TreeSelect
          style={{ width: '100%' }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please Select a Program > Course"
          onChange={onChange}
          loadData={onLoadData}
          treeData={treeData}
        />
      </ModuleForm>
    </DashWrapper>
  );
};
