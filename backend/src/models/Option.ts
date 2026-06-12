import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Option extends Model {
  public id!: string;
  public text!: string;
  public question_id!: number;
  public is_correct!: boolean;
}

Option.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, tableName: "options", underscored: true },
);

export default Option;