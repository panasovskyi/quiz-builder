import { Question } from "@/types/quiz";
import styles from "./QuestionBlock.module.scss";
import { BooleanOptions } from "./BooleanOptions/BooleanOption";
import { CheckboxOptions } from "./CheckboxOptions/CheckboxOptions";
import { InputAnswer } from "./InputGroup/InputGroup";

type Props = {
  question: Question;
  index: number;
};

export const QuestionBlock: React.FC<Props> = ({ question, index }) => {
  const type = question.type?.toLowerCase();

  return (
    <fieldset className={styles.questionBlock}>
      <h3 className={styles.questionTitle}>
        <span>Question {index + 1}:</span> {question.text}
      </h3>

      {type === "boolean" && <BooleanOptions question={question} />}

      {type === "checkbox" && <CheckboxOptions question={question} />}

      {type === "input" && <InputAnswer />}
    </fieldset>
  );
};
