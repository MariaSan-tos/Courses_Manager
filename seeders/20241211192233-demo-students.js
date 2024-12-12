'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      { name: 'Carlos Silva', email: 'carlos.silva@example.com', age: 22, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Juliana Souza', email: 'juliana.souza@example.com', age: 20, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rafael Oliveira', email: 'rafael.oliveira@example.com', age: 25, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fernanda Lima', email: 'fernanda.lima@example.com', age: 19, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ana Costa', email: 'ana.costa@example.com', age: 21, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'João Almeida', email: 'joao.almeida@example.com', age: 23, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Marta Ribeiro', email: 'marta.ribeiro@example.com', age: 26, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pedro Santos', email: 'pedro.santos@example.com', age: 22, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mariana Ferreira', email: 'mariana.ferreira@example.com', age: 27, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lucas Lima', email: 'lucas.lima@example.com', age: 21, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beatriz Martins', email: 'beatriz.martins@example.com', age: 24, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gabriel Souza', email: 'gabriel.souza@example.com', age: 22, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Carla Oliveira', email: 'carla.oliveira@example.com', age: 28, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Felipe Pereira', email: 'felipe.pereira@example.com', age: 20, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ricardo Santos', email: 'ricardo.santos@example.com', age: 23, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Larissa Alves', email: 'larissa.alves@example.com', age: 19, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eduardo Pinto', email: 'eduardo.pinto@example.com', age: 30, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sandra Oliveira', email: 'sandra.oliveira@example.com', age: 22, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gabriela Silva', email: 'gabriela.silva@example.com', age: 24, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Thiago Rocha', email: 'thiago.rocha@example.com', age: 21, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
