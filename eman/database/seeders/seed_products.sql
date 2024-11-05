module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('products', [
      {
        name: '',
        image: '',
        description: '',
        price: 0.00
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('products', null, {})
};
