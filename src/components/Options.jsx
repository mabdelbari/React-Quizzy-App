import React from "react";
import useQuiz from "../hooks/useQuiz";
import { decodeHTMLEntities } from "../utils";

export default function Options({ question }) {
  const { answer, dispatch } = useQuiz();

  const options = question.incorrect_answers
    .concat(question.correct_answer)
    .toSorted();

  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {options.map((option) => (
        <button
          key={option}
          className={`btn btn-option ${
            hasAnswer
              ? option === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          } ${option === answer && "answer"}`}
          onClick={() => dispatch({ type: "selectAnswer", payload: option })}
          disabled={hasAnswer}
        >
          {decodeHTMLEntities(option)}
        </button>
      ))}
    </div>
  );
}
