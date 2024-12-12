const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');  
const Course = require('./models/Course'); 
const {user, student, course} = require('./controllers');
const dotenv = require('dotenv');
const router = express.Router();     

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.get('/', async (req, res) => {
    res.render('user/login');
});

app.get('/register', (req, res) => {
    res.render('user/register'); 
});

app.use('/user', user)
app.use('/student', student);
app.use('/courses', course);

sequelize.sync()  
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
