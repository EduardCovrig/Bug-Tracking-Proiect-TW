const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tw_db', 'postgres', '4796', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
  });
sequelize.authenticate()
  .then(() => {
    console.log('Conexiunea la baza de date a reușit!');
  })
  .catch(err => {
    console.error('Eroare la conectare:', err);
  });

module.exports = sequelize;

