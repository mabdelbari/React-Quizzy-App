import React from "react";

export default function Progress({
  numQuestions,
  currentQues,
  score,
  maxScore,
  answer,
}) {
  return (
    <div className="progressBar">
      <progress
        max={numQuestions}
        value={currentQues + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQues + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </div>
  );
}
