import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Quiz extends Model {
  public id!: string;
  public title!: string;
}

Quiz.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "quizzes",
    underscored: true,
  },
);

export default Quiz;