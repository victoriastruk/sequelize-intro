const {
  sequelize,
  Student,
  Group,
  Subject,
  StudentSubject,
} = require('./models');

// sequelize
//   .sync({ force: true })
//   .then(() => console.log('Sync OK'))
//   .catch((err) => console.log('Err: ', err));

(async function () {
  //   student n:1 group
  //  Student(firstName, ..., groupId REFERENCES group)

  const newGroup1 = { title: 'pe2022-1', enteredAt: '2022-01-01' };
  const newGroup2 = { title: 'pe2023-1', enteredAt: '2023-01-01' };

  // const createdGroup1 = await Group.create(newGroup1);
  // const createdGroup2 = await Group.create(newGroup2);

  // console.log(createdGroup1, createdGroup2);

  const newStudent1 = {
    firstName: 'Test',
    lastName: 'Testovych',
    email: 'm@m1.com',
    groupId: 1,
  };

  const newStudent2 = {
    firstName: 'Test',
    lastName: 'Testovych',
    email: 'm@m2.com',
    groupId: 1,
  };

  const newStudent3 = {
    firstName: 'Test',
    lastName: 'Testovych',
    email: 'm@m3.com',
    groupId: 2,
  };

  // const createdStudent1 = await Student.create(newStudent1);
  // const createdStudent2 = await Student.create(newStudent2);
  // const createdStudent3 = await Student.create(newStudent3);
  // console.log(createdStudent1, createdStudent2, createdStudent3);

  // Eager Loading ~ JOINS - отримаємо інформацію з усіх моделей (foreign keys)
  // const foundStudentsWithGroups = await Student.findAll({
  //   raw: true,
  //   include: 'Group',
  // });

  // console.log('foundStudentsWithGroups :>> ', foundStudentsWithGroups);

  // const foundGroupsWithStudents = await Group.findAll({
  //   raw: true,
  //   include: 'Student',
  // });
  // console.log('foundGroupsWithStudents :>> ', foundGroupsWithStudents);

  // Lazy loading - отримаємо інформацію з пов'язаної моделі (associations)

  //  Student.belongsTo => student.getGroup(), ...
  // const student1Inst = await Student.findByPk(1);
  // const groupOfStud1 = await student1Inst.getGroup({ raw: true });
  // console.log('groupOfStud1 :>> ', groupOfStud1);

  // Group.hasMany => group.getStudents(), ...
  // const group1Inst = await Group.findByPk(1);
  // const studOfGroup1 = await group1Inst.getStudents({ raw: true });
  // console.log('studOfGroup1 :>> ', studOfGroup1);

  // Student m:n Subject => students <= students_to_subjects => subjects

  const subject1 = { title: 'Data Bases', hours: 100 };
  const subject2 = { title: 'Web-programming', hours: 150 };

  const studSubj1 = { studentId: 1, subjectId: 1, mark: 100 };
  const studSubj2 = { studentId: 1, subjectId: 2, mark: 90 };
  const studSubj3 = { studentId: 2, subjectId: 1, mark: 85 };
  const studSubj4 = { studentId: 2, subjectId: 2, mark: 88 };

  // await Subject.create(subject1);
  // await Subject.create(subject2);

  await StudentSubject.create(studSubj1);
  await StudentSubject.create(studSubj2);
  await StudentSubject.create(studSubj3);
  await StudentSubject.create(studSubj4);

  // Eager Loading

  // const studentsWithSubjects = await Student.findAll({
  //   raw: true,
  //   include: Subject,
  // });
  // console.log('studentsWithSubjects :>> ', studentsWithSubjects);

  // Lazy Loading

  // Student.belongsToMany => student.getSubjects
  // Subject.belongsToMany => subject.getStudents

  const student1Inst = await Student.findByPk(1);
  const subjOfStud1 = await student1Inst.getSubjects({ raw: true });
  console.log('subjOfStud1 :>> ', subjOfStud1);
})();
