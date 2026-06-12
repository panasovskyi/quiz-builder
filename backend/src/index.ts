import express from "express";
import cors from "cors";
import Quiz from "./models/Quiz";
import Question from "./models/Question";
import sequelize from "./config/database";
import Option from "./models/Option";
import quizRoutes from "./routes/quizRoutes";

const app = express();
app.use(cors());
app.use(express.json());

Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions",
  onDelete: "CASCADE",
});
Question.belongsTo(Quiz, { foreignKey: "quiz_id" });

Question.hasMany(Option, {
  foreignKey: "question_id",
  as: "options",
  onDelete: "CASCADE",
});
Option.belongsTo(Question, { foreignKey: "question_id" });

app.use("/api", quizRoutes);

const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("База підключена й синхронізована");

    app.listen(PORT, () => {
      console.log(`Сервер запущений на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Не вдалось зєднатися з базою, ${error}`);
  });

export default app;
