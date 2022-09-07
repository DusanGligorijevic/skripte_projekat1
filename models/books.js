'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Authors, Publishers}) {
      // define association here
      this.belongsTo(Authors, {foreignKey: 'AuthorId', as: 'author'});
      this.belongsTo(Publishers, {foreignKey: 'PublisherId', as: 'publisher'});
    }
  };
  Books.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Books',
  });
  return Books;
};