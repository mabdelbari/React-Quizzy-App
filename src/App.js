import React from "react";
import useQuiz from "./hooks/useQuiz";

import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorContainer from "./components/ErrorContainer";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Button from "./components/Button";
import Timer from "./components/Timer";

import PreparingScreen from "./components/PreparingScreen";
import Main from "./components/Main";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app d-flex flex-column">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorContainer />}
        {status === "prepare" && <PreparingScreen />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <div>
              <Timer />
              <Button />
            </div>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen />
          </>
        )}
      </Main>
    </div>
  );
}
