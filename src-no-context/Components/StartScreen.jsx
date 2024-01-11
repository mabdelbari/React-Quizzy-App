import React from "react";

export default function StartScreen({
  numQuestions,
  category,
  categoriesName,
  dispatch,
}) {
  return (
    <div className="d-flex flex-column">
      <h2 className="text-center">
        Are you ready to challenge yourself in {categoriesName[category]} Quiz
      </h2>
      <h3 className="text-center">
        You are about to start answering {numQuestions} questions to test your{" "}
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
