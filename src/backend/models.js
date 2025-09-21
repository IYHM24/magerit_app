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
//const Tipo_Activo = sequelize.define('Tipo_Activo', {
//  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//  nombre: { type: DataTypes.STRING, unique: true, allowNull: false }
//});

// Activo
const Activo = sequelize.define('Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  activo: { type: DataTypes.STRING, allowNull: false },
  tipo_activo: { type: DataTypes.STRING },
  //nombre_tipo_activo: { type: DataTypes.STRING },
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

//Riesgo intriseco




const Riesgo_Intriseco = sequelize.define('Riesgo_Intriseco', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  valoracion_vulnerabilidad: { type: DataTypes.STRING },
  valor_vulnearabilidad: { type: DataTypes.INTEGER },
  valoracion_impacto: { type: DataTypes.INTEGER },
  valor_impacto: { type: DataTypes.INTEGER },
  riesgo_intrinseco: { type: DataTypes.INTEGER },
});

//Tabla intermedia riesgo intrinseco vs activo
const Riesgo_Intriseco_Vs_Activo = sequelize.define('Riesgo_Intriseco_Vs_Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_activo: { type: DataTypes.INTEGER },
  id_tipo_servicio: { type: DataTypes.INTEGER },
  id_riesgo_intrinseco: { type: DataTypes.INTEGER },
});

//Tabla total riesgo intrinseco vs activo relacion 1 a 1 un activo solo tiene un total de riesgo intrinseco
const Total_Riesgo_Intriseco_Activo = sequelize.define('Total_Riesgo_Intriseco_Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_riesgo_intrinseco: { type: DataTypes.INTEGER },
  id_activo: { type: DataTypes.INTEGER },
  total_riesgo_intrinseco_activo: { type: DataTypes.INTEGER },
});

// Tabla amenaza vs tipo de activo
const Amenaza_Tipo_Activo = sequelize.define('Amenaza_Tipo_Activo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_amenaza: { type: DataTypes.INTEGER },
  tipo_activo: { type: DataTypes.STRING },
});

// Relaciones

//Activos
//Tipo_Activo.hasMany(Activo, { foreignKey: 'id_tipo_activo' });
//Activo.belongsTo(Tipo_Activo, { foreignKey: 'id_tipo_activo' });
//
Departamento.hasMany(Activo, { foreignKey: 'id_propietario' });
Activo.belongsTo(Departamento, { foreignKey: 'id_propietario' });

//Amenazas
Amenaza_Grupo.hasMany(Amenazas, { foreignKey: 'id_grupo_amenaza' });
Amenazas.belongsTo(Amenaza_Grupo, { foreignKey: 'id_grupo_amenaza' });

// riesgo intrinseco

//Una amenaza puede tener varios riesgos intrinsecos, solo aparece una vez por activo
Riesgo_Intriseco.belongsTo(Amenazas, { foreignKey: 'id_amenaza' });
Amenazas.hasMany(Riesgo_Intriseco, { foreignKey: 'id_amenaza' });

//un activo solo puede tener un riesgo intrisenco (no total) 1:1
Riesgo_Intriseco.belongsTo(Riesgo_Intriseco_Vs_Activo, { foreignKey: 'id_activo' });
Riesgo_Intriseco_Vs_Activo.hasOne(Riesgo_Intriseco, { foreignKey: 'id_activo' });
//
Activo.belongsTo(Riesgo_Intriseco_Vs_Activo, { foreignKey: 'id_activo' });
Riesgo_Intriseco_Vs_Activo.hasOne(Activo, { foreignKey: 'id_activo' });


//un riesgo intrinseco solo puede tener un total de riesgo intrinseco 1:1
Total_Riesgo_Intriseco_Activo.belongsTo(Riesgo_Intriseco, { foreignKey: 'id_riesgo_intrinseco' });
Riesgo_Intriseco.hasOne(Total_Riesgo_Intriseco_Activo, { foreignKey: 'id_riesgo_intrinseco' });

module.exports = {
  sequelize, Departamento, 
  Activo, Amenaza_Grupo,
  Amenazas, Riesgo_Intriseco,
  Riesgo_Intriseco_Vs_Activo,
  Total_Riesgo_Intriseco_Activo,
  Amenaza_Tipo_Activo
 };
