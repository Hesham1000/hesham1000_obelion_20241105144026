module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: 'user1@example.com',
      password: 'hashed_password1'
    },
    {
      email: 'user2@example.com',
      password: 'hashed_password2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
