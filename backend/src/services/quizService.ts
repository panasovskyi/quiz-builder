import Quiz from "../models/Quiz";
import Question from "../models/Question";
import Option from "../models/Option";
import sequelize from "../config/database";

const quizService = {
  create: async (title: string, questions: any[]) => {
    const transaction = await sequelize.transaction();

    try {
      const quiz = await Quiz.create(
        { title, questions: questions || [] },
        {
          include: [
            {
              model: Question,
              as: "questions",
              include: [{ model: Option, as: "options" }],
            },
          ],
          transaction,
        },
      );

      await transaction.commit();
      return quiz;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  findAll: async () => {
    return await Quiz.findAll({
      attributes: [
        "id",
        "title",
        [
          sequelize.fn("COUNT", sequelize.col("questions.id")),
          "questions_count",
        ],
      ],
      include: [
        {
          model: Question,
          as: "questions",
          attributes: [],
        },
      ],
      group: ["Quiz.id"],
    });
  },

  findById: async (id: string) => {
    return await Quiz.findByPk(id, {
      include: [
        {
          model: Question,
          as: "questions",
          include: [
            {
              model: Option,
              as: "options",
            },
          ],
        },
      ],
    });
  },

  delete: async (id: string) => {
    return await Quiz.destroy({
      where: { id },
    });
  },
};

export default quizService;
