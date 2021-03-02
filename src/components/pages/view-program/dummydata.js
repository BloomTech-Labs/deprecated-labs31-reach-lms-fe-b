//Program Test Data
const programData = {
  programName: 'Test Program Name',
  programType: 'Education K-12',
  programDescription: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
    at consectetur lorem donec. Venenatis tellus in metus vulputate eu
    scelerisque felis imperdiet. Sapien faucibus et molestie ac
    feugiat sed. Eget aliquet nibh praesent tristique magna sit amet
    purus."`,

  courses: [
    {
      courseid: 0,
      coursecode: '0',
      coursename: 'Test Course Name 1',
      coursedescription: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
        at consectetur lorem donec. Venenatis tellus in metus vulputate eu'`,
      modules: [
        {
          moduleId: 1,
          moduleName: 'Test Module 1',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
      ],
    },
    {
      courseid: 1,
      coursecode: '1',
      coursename: 'Test Course Name 2',
      coursedescription: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
        at consectetur lorem donec. Venenatis tellus in metus vulputate eu'`,
      modules: [
        {
          moduleId: 2,
          moduleName: 'Test Module 2',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
        {
          moduleId: 3,
          moduleName: 'Test Module 2',
          moduleDescription: 'Module Description',
          moduleContent: 'Module Content Goes Here',
        },
      ],
    },
  ],
};

export default programData;
