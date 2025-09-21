// models.js - Sequelize modelos para Departamento, Tipo_Activo y Activo
const { Sequelize, DataTypes } = require('sequelize');
const sqlite3 = require("sqlite3");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  dialectModule: sqlite3,
});

// Departamento
const Departamento = sequelize.define('Departamento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, unique: true, allowNull: false },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Tipo_Activo
const Tipo_Activo = sequelize.define('Tipo_Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// Activo
const Activo = sequelize.define('Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  activo: { type: DataTypes.STRING, allowNull: false },
  tipo_activo: { type: DataTypes.INTEGER },
  nombre_tipo_activo: { type: DataTypes.STRING },
  valor: { type: DataTypes.INTEGER },
  valoracion: { type: DataTypes.STRING },
  autenticidad: { type: DataTypes.INTEGER },
  confidencialidad: { type: DataTypes.INTEGER },
  integridad: { type: DataTypes.INTEGER },
  disponibilidad: { type: DataTypes.INTEGER },
  trazabilidad: { type: DataTypes.INTEGER },
  id_propietario: { type: DataTypes.INTEGER },
  propietario: { type: DataTypes.STRING }
});

// Amenazas Grupo
const Amenaza_Grupo = sequelize.define('Amenaza_Grupo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
});

//Amenazas
const Amenazas = sequelize.define('Amenaza', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_grupo_amenaza: { type: DataTypes.INTEGER },
  amenaza: { type: DataTypes.STRING, allowNull: false },
  autenticidad: { type: DataTypes.BOOLEAN },
  confidencialidad: { type: DataTypes.BOOLEAN },
  integridad: { type: DataTypes.BOOLEAN },
  disponibilidad: { type: DataTypes.BOOLEAN },
  trazabilidad: { type: DataTypes.BOOLEAN },
  servicios: {type: DataTypes.BOOLEAN },
  software: {type: DataTypes.BOOLEAN },
  hardware: {type: DataTypes.BOOLEAN },
  informacion: {type: DataTypes.BOOLEAN },
  instalaciones: {type: DataTypes.BOOLEAN },
  personal: {type: DataTypes.BOOLEAN },
});

// Relaciones
//Activos
Tipo_Activo.hasMany(Activo, { foreignKey: 'id_tipo_activo' });
Activo.belongsTo(Tipo_Activo, { foreignKey: 'id_tipo_activo' });
//
Departamento.hasMany(Activo, { foreignKey: 'id_propietario' });
Activo.belongsTo(Departamento, { foreignKey: 'id_propietario' });
//Amenazas
Amenaza_Grupo.hasMany(Amenazas, { foreignKey: 'id_grupo_amenaza' });
Amenazas.belongsTo(Amenaza_Grupo, { foreignKey: 'id_grupo_amenaza' });

module.exports = {
  sequelize, Departamento, 
  Tipo_Activo, Activo, 
  Amenaza_Grupo, Amenazas
 };
