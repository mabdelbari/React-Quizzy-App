import React from "react";
import useQuiz from "../hooks/useQuiz";

export default function Button() {
  const { currentQues, answer, numOfQuestions, dispatch } = useQuiz();

  if (answer === null) return;

  if (currentQues < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQues === numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "submitQuiz" })}
      >
        Submit
      </button>
    );
}
