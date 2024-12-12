const express = require('express');
const db = require('../config/database');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const students = await Student.findAll(); 
        const courses = await Course.findAll();

        res.render('courses/list', { students, courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar alunos e cursos.');
    }
});

// Cadastro de curso
router.post('/add', async (req, res) => {
    const { name, description } = req.body;
    try {
        await db.query('INSERT INTO courses (name, description) VALUES (?, ?)', [name, description]);
        res.redirect('/courses/add');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar curso.');
    }
});

module.exports = router;
