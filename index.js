const { sequelize, Student } = require('./models');

// sequelize
//   .sync({ force: true })
//   .then(() => console.log('Sync OK'))
//   .catch((err) => console.log('Err: ', err));

(async function () {
  //CRUD
  //   //C - INSERT - create
  //   const newStudent = {
  //     firstName: 'Test6',
  //     lastName: 'Testovych6',
  //     email: 'test6@gmail.com',
  //     birthday: '2000-10-12',
  //     isMale: true,
  //   };
  //   const createdStudent = await Student.create(newStudent);
  //   console.log('CretedStudent: ', createdStudent.get());

  // R - SELECT - findAll / findOne / findByPk
  //   const foundStudents = await Student.findAll({ raw: true });
  //   console.log('foundStudents', foundStudents);

  // const foundStudent = await Student.findByPk(1, { raw: true });
  //   console.log('foundStudent', foundStudent);

  //Проєкція - SELECT
  //   const foundStudents = await Student.findAll({
  //     raw: true,
  //     attributes: ['firstName', 'email'],
  //   });
  //   console.log('foundStudents', foundStudents);

  //Пагінація + сортування
  // сортування - ORDER BY - order
  //пагінація - LIMIT OFFSET - LIMIT offset
  //   const foundStudents = await Student.findAll({
  //     raw: true,
  //     order: [['id', 'DESC']],
  //     limit: 2,
  //     offset: 2,
  //     attributes: { exclude: ['createdAt', 'updatedAt'] },
  //   });
  //   console.log('foundStudents', foundStudents);

  //Фільтрація
  //WHERE - where
  // id=5
  //   const foundStudents = await Student.findAll({
  //     raw: true,
  //     where: { id: 3 },
  //   });
  //   console.log('foundStudents', foundStudents);

  // Task: Вивести чоловіків або у кого кількість активностей = 0
  const foundStudent = await Student.findAll({
    raw: true,
    where: {
      [Op.or]: [{ isMale: true }, { activitiesCount: 0 }],
    },
  });
  console.log(foundStudent);

  // Використання функцій -----
  // sequelize.fn('ФУНКЦІЯ', sequelize.col('СТОВПЧИК'))

  // Додати COUNT(id)
  const studentsCount = await Student.findAll({
    raw: true,
    attributes: [sequelize.fn('COUNT', sequelize.col('id'))],
  });
  console.log('studentsCount :>> ', studentsCount);

  // + Додавання стовпчика - include

  // Додати стовпчик з віком
  //   const foundStudents = await Student.findAll({
  //     raw: true,
  //     attributes: {
  //       include: [[sequelize.fn('age', sequelize.col('birthday')), 'stud_age']],
  //     },
  //   });
  //   console.log('foundStudents :>> ', foundStudents);

  // Нестандартні для sequelize операції прописуються чистим SQL:
  // sequelize.literal('SQL-код')

  //   const foundStudents = await Student.findAll({
  //     raw: true,
  //     attributes: {
  //       include: [
  //         [sequelize.literal('EXTRACT (YEAR FROM age(birthday))'), 'stud_age'],
  //       ],
  //     },
  //   });
  //   console.log('foundStudents :>> ', foundStudents);

  // *GROUP BY + HAVING - group + having -----

  const foundStudents = await Student.findAll({
    raw: true,
    attributes: [
      'isMale',
      [
        sequelize.fn('sum', sequelize.col('activitiesCount')),
        'stud_activitiesCount',
      ],
    ],
    group: 'isMale',
    having: sequelize.literal('sum("activitiesCount") >= 0'),
  });
  console.log('foundStudets :>> ', foundStudents);

  // U - UPDATE - update (як, опції)
  // => [ кількість_оновлених ]                без returning: true
  // => [ кількість_оновлених, масив оновлених ] з returning: true

  const updatedStudent = await Student.update(
    { firstName: 'Ivo' },
    {
      where: { id: 1 },
      raw: true,
      returning: true, // повернути оновлений рядок
    }
  );

  console.log('updatedStudent :>> ', updatedStudent[1][0]);

  // D - DELETE - destroy
  // => кількість оновлених

  const deletedStudCount = await Student.destroy({
    where: {
      id: 1,
    },
  });
  console.log('deletedStudCount :>> ', deletedStudCount);
})();
