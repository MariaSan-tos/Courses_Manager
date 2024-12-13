module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [
      {
        name: 'Aeronautica',
        description: 'Curso de Aeronáutica',
        createdAt: new Date(),  
        updatedAt: new Date()   
      },
      {
        name: 'Matemática',
        description: 'Curso de Matemática',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Física',
        description: 'Curso de Física',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
