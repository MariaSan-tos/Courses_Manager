const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {Router} = require('express');

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

        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Email já registrado.');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o novo usuário
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Criar sessão
        req.session.user = { id: user.id, name: user.name };

        // Redirecionar para a página de login
        res.redirect('/'); // Redireciona diretamente sem usar .send
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar usuário.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuário pelo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Usuário não encontrado.');
        }

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Senha incorreta.');
        }

        // Criar sessão e redirecionar
        req.session.user = { id: user.id, name: user.name };
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login.');
    }
});


module.exports = router;
