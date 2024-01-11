import React from "react";
import useQuiz from "../hooks/useQuiz";

export default function StartScreen() {
  const { category, categoriesName, numOfQuestions, dispatch } = useQuiz();

  return (
    <div className="d-flex flex-column">
      <h2 className="text-center">
        Are you ready to challenge yourself in {categoriesName[category]} Quiz
      </h2>
      <h3 className="text-center">
        You are about to start answering {numOfQuestions} questions to test your{" "}
        {categoriesName[category]} mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's start
      </button>
    </div>
  );
}
