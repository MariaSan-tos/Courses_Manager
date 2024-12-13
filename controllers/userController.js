const express = require('express');
const { User } = require('../models');
const { sequelize } = require('../models'); 
const bcrypt = require('bcryptjs');
const {Router} = require('express');
const { Op } = require('sequelize');  


const router = Router();

router.get('/register', (req, res) => {
    res.render('user/register'); 
});

router.get('/login', (req, res) => {
    res.render('user/login'); 
});


router.get('/logout', (req,res)=>{
    console.log('Logout efetuado');
    req.session.destroy();
    res.redirect('/');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('user/dashboard', { user: req.session.user });
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Email já registrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        req.session.user = { id: user.id, name: user.name };

        res.redirect('/'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar usuário.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Usuário não encontrado.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Senha incorreta.');
        }

        req.session.user = { id: user.id, name: user.name };
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login.');
    }
});

router.get('/edit', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/l'); 
    }

    const userId = req.session.user.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.render('user/edit', { user }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar dados do usuário.');
    }
});

router.post('/edit', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const { id } = req.session.user;
    const { name, email, password, confirmPassword } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        const existingUser = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
        if (existingUser) {
            return res.status(400).send('Email já registrado por outro usuário.');
        }

        let hashedPassword = user.password;
        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).send('As senhas não coincidem.');
            }
            hashedPassword = await bcrypt.hash(password, 10); 
        }

        await user.update({
            name,
            email,
            password: hashedPassword,
        });

        req.session.user = { id: user.id, name: user.name }; 

        res.redirect('/user/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar usuário.');
    }
});

router.post('/delete', async (req, res) => {
    const userId = req.session.user?.id;  

    if (!userId) {
        return res.status(401).send('Usuário não autenticado.');
    }

    try {
        const user = await User.findByPk(userId); 

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        await user.destroy();

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao destruir a sessão.');
            }
            res.redirect('/'); 
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir o usuário.');
    }
});


module.exports = router;
