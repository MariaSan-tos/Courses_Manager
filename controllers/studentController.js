const express = require('express');
const sequelize = require('../config/database');  // Importe a instância configurada de Sequelize
const Course = require('../models/Course');
const Student = require('../models/Student'); 

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const students = await sequelize.query(`
      SELECT students.id, students.name, students.age, courses.name AS course_name
      FROM students
      LEFT JOIN courses ON students.courseId = courses.id
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    res.render('students/list', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar alunos e cursos.');
  }
});


router.get('/add', async (req, res) => {
  try {
    const courses = await sequelize.query('SELECT * FROM courses', {
      type: sequelize.QueryTypes.SELECT
    });

    res.render('student/add', { courses: courses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar cursos.');
  }
});

router.post('/add', async (req, res) => {
  const { name, age, courseId, email } = req.body;  // Inclui o email
  try {
    await sequelize.query(
      'INSERT INTO students (name, age, courseId, email, createdAt, updatedAt) VALUES (:name, :age, :courseId, :email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',  
      { replacements: { name, age, courseId, email }, type: sequelize.QueryTypes.INSERT }
    );
    res.redirect('/student/list'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar aluno. TENTE NOVAMENTE (sério, é esse o fix)');
  }
});



router.get('/', async (req, res) => {
    try {

      const students = await Student.findAll(); 
        const courses = await Course.findAll(); 

        res.render('students/list', { students, courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar alunos e cursos.');
    }
});


router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const [student] = await sequelize.query(
          'SELECT * FROM students WHERE id = :id',
          {
              replacements: { id },
              type: sequelize.QueryTypes.SELECT
          }
      );

      const courses = await sequelize.query(
          'SELECT * FROM courses',
          { type: sequelize.QueryTypes.SELECT }
      );

      if (!student) {
          return res.status(404).send('Aluno não encontrado');
      }

      res.render('students/edit', { student, courses });
  } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar dados do aluno.');
  }
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, courseId } = req.body;

  try {
      const [student] = await sequelize.query(
          'SELECT * FROM students WHERE id = :id',
          {
              replacements: { id },
              type: sequelize.QueryTypes.SELECT
          }
      );

      if (!student) {
          return res.status(404).send('Aluno não encontrado');
      }

      await sequelize.query(
        `UPDATE students 
         SET name = :name, 
             age = :age, 
             courseId = :courseId, 
             updatedAt = CURRENT_TIMESTAMP 
         WHERE id = :id`,
        {
            replacements: { id, name, age, courseId },
            type: sequelize.QueryTypes.UPDATE
        }
    );

      res.redirect('/student/list');
  } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar aluno.');
  }
});


router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
      if (!id) {
        return res.status(404).send('Aluno não encontrado');
      }

      await sequelize.query(
        'DELETE FROM students WHERE id = :id',
          {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
          }
        );

      res.redirect('/student/list');
  } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir aluno.');
  }
});


module.exports = router;
