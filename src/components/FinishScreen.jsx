import React from "react";
import useQuiz from "../hooks/useQuiz";

export default function FinishScreen() {
  const { score, highScore, maxPossibleScore, dispatch } = useQuiz();

  const precentage = (score / maxPossibleScore) * 100;

  return (
    <>
      <div>
        <p className="result">
          You scored <strong>{score}</strong> out of {maxPossibleScore} (
          {Math.ceil(precentage)}%)
        </p>

        <p className="high-score">High Score: {highScore} points</p>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-ui float-none"
            onClick={() => dispatch({ type: "exitQuiz" })}
          >
            Exit
          </button>

          <button
            className="btn btn-ui float-none"
            onClick={() => dispatch({ type: "restartQuiz" })}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </>
  );
}
