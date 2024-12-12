const express = require('express');
const db = require('../config/database');
const Course = require('../models/Course');
const { Student } = require('../models'); 

const router = express.Router();

router.get('/list', async (req, res) => {
    try {
      const students = await Student.findAll({
        include: {
          model: Course,    
          as: 'course',     
          required: false    
        }
      });
  
      res.render('students/list', { students });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar alunos e cursos.');
    }
  });

// Rota para renderizar a página de adicionar aluno
router.get('/student/add', async (req, res) => {
    try {
        // Buscar todos os cursos para exibir no formulário de cadastro
        const courses = await Course.findAll();
        res.render('students/add', { courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar cursos.');
    }
});

// Rota para adicionar um aluno
router.post('/add', async (req, res) => {
    const { name, age, courseId } = req.body;
    try {
        // Criar o aluno com Sequelize
        await Student.create({ name, age, courseId });
        res.redirect('/students'); // Redireciona para a lista de alunos
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar aluno.');
    }
});

// Rota para listar alunos
router.get('/', async (req, res) => {
    try {
        // Buscar alunos e cursos com Sequelize
        const students = await Student.findAll(); // Busca todos os alunos
        const courses = await Course.findAll(); // Busca todos os cursos

        // Passar os alunos e cursos para a view
        res.render('students/list', { students, courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar alunos e cursos.');
    }
});

module.exports = router;
