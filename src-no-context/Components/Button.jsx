import React from "react";

export default function Button({
  answer,
  currentQues,
  numQuestions,
  dispatch,
}) {
  if (answer === null) return;

  if (currentQues < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQues === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "submitQuiz" })}
      >
        Submit
      </button>
    );
}
