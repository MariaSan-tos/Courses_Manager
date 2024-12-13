const express = require('express');
const db = require('../config/database');
const Course = require('../models/Course');
const { sequelize } = require('../models');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const [coursesWithStudents] = await db.query(`
            SELECT 
                courses.id AS course_id,
                courses.name AS course_name,
                IFNULL(GROUP_CONCAT(students.name ORDER BY students.name), '0') AS students_names
            FROM 
                courses
            LEFT JOIN 
                students ON students.courseId = courses.id
            GROUP BY 
                courses.id;
        `);

        res.render('courses/list', { coursesWithStudents });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar cursos e alunos.');
    }
});

router.get('/add', (req, res) => {
    res.render('courses/add'); 
});


router.post('/add', async (req, res) => {
    const { name, description } = req.body;
    console.log('Dados recebidos:', req.body);
    const currentTimestamp = new Date();
    try {
        await db.query(
            'INSERT INTO courses (name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
            {
                replacements: [name, description, currentTimestamp, currentTimestamp], 
                type: db.QueryTypes.INSERT 
            }
        );
        res.redirect('/courses/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar curso.');
    }
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [course] = await sequelize.query(
            'SELECT * FROM courses WHERE id = :id',
            {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!course) {
            return res.status(404).send('Curso não encontrado');
        }

        res.render('courses/edit', { course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar dados do curso.');
    }
});


router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [course] = await sequelize.query(
            'SELECT * FROM courses WHERE id = :id',
            {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!course) {
            return res.status(404).send('Curso não encontrado');
        }

        await sequelize.query(
            `UPDATE courses 
            SET name = :name, 
                description = :description, 
                updatedAt = CURRENT_TIMESTAMP 
            WHERE id = :id`,
            {
                replacements: { id, name, description },
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.redirect('/courses/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar curso.');
    }
});

  
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [course] = await sequelize.query(
            'SELECT * FROM courses WHERE id = :id',
            {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!course) {
            return res.status(404).send('Curso não encontrado');
        }

        await sequelize.query(
            'UPDATE students SET courseId = NULL WHERE courseId = :id',
            {
                replacements: { id },
                type: sequelize.QueryTypes.UPDATE
            }
        );

        await sequelize.query(
            'DELETE FROM courses WHERE id = :id',
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            }
        );

        res.redirect('/courses/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir curso.');
    }
});
  

module.exports = router;
