// seed.js - Semilla inicial para Tipo_Activo usando Sequelize

const { sequelize, Tipo_Activo } = require('./models');

async function main() {
  await sequelize.sync({ force: true }); // Crea tablas y borra datos previos

  await Tipo_Activo.bulkCreate([
    { nombre: 'Servicio' },
    { nombre: 'Hardware' },
    { nombre: 'Informacion' },
    { nombre: 'Software' },
    { nombre: 'Instalacion' },
    { nombre: 'Personal' }
  ]);

  console.log('Semilla de Tipo_Activo creada correctamente');
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
