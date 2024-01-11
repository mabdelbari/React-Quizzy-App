import React from "react";
import Options from "./Options";
import useQuiz from "../hooks/useQuiz";
import { decodeHTMLEntities } from "../utils";

export default function Question() {
  const { questions, currentQues } = useQuiz();
  const question = questions.at(currentQues);

  return (
    <div>
      <h4>{decodeHTMLEntities(question.question)}</h4>
      <Options question={question} />
    </div>
  );
}
