import React, { useEffect, useState } from "react";
import useQuiz from "../hooks/useQuiz";

const SEC_PER_QUESTION = 30;

export default function Timer() {
  const { numOfQuestions, dispatch } = useQuiz();

  const timeRemaining = numOfQuestions * SEC_PER_QUESTION;

  const [ellapsedSeconds, setEllapsedSeconds] = useState(timeRemaining);

  const mins = Math.floor(ellapsedSeconds / 60);
  const secs = ellapsedSeconds % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setEllapsedSeconds((prev) => prev - 1);
      if (ellapsedSeconds === 0) dispatch({ type: "submitQuiz" });
    }, 1000);

    return () => clearInterval(timer);
  }, [ellapsedSeconds, dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
