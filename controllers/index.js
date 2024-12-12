const courseController = require('./courseController');
const userController = require('./userController');
const studentController = require('./studentController');


controllers = {
    course: courseController,
    user: userController,
    student: studentController
}

module.exports = controllers;