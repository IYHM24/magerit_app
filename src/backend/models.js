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
  nombre_tipo_activo: { type: DataTypes.STRING},
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

// Relaciones
Tipo_Activo.hasMany(Activo, { foreignKey: 'id_tipo_activo' });
Activo.belongsTo(Tipo_Activo, { foreignKey: 'id_tipo_activo' });

Departamento.hasMany(Activo, { foreignKey: 'id_propietario' });
Activo.belongsTo(Departamento, { foreignKey: 'id_propietario' });

module.exports = { sequelize, Departamento, Tipo_Activo, Activo };
