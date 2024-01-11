import React from "react";

export default function FinishScreen({ score, maxScore, highScore, dispatch }) {
  const precentage = (score / maxScore) * 100;

  return (
    <>
      <div>
        <p className="result">
          You scored <strong>{score}</strong> out of {maxScore} (
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
