import React from "react";

export default function Options({ question, dispatch, answer }) {
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
          {option}
        </button>
      ))}
    </div>
  );
}
