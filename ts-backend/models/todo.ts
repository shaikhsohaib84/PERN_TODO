'use strict';
import {
  Model
} from 'sequelize';

interface TodoAttributes {
  id: number;
  UserId: number;
  title: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Todo extends Model<TodoAttributes> implements TodoAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    UserId!: number;
    title!: string
    description!: string

    static associate(models: any) {
      // define association here
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Todo',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};