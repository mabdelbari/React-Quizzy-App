import React from "react";
import useQuiz from "../hooks/useQuiz";

export default function Progress() {
  const { currentQues, answer, score, maxPossibleScore, numOfQuestions } =
    useQuiz();

  return (
    <div className="progressBar">
      <progress
        max={numOfQuestions}
        value={currentQues + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQues + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxPossibleScore}
      </p>
    </div>
  );
}
