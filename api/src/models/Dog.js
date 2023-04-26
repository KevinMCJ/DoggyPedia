const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Dog", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    }
    ,
    life_span: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://static4.depositphotos.com/1011415/285/v/600/depositphotos_2855252-stock-illustration-little-jack-russel.jpg',
      validate: {
        isUrl: true,
      }
    },
  });
};
