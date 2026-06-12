import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Question extends Model {
  public id!: string;
  public quiz_id!: number;
  public text!: string;
  public type!: "boolean" | "input" | "checkbox";
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    quiz_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("boolean", "input", "checkbox"),
      allowNull: false,
    },
  },
  { sequelize, tableName: "questions", underscored: true },
);

export default Question;
