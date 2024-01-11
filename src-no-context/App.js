import React, { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import ErrorContainer from "./Components/ErrorContainer";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Button from "./Components/Button";
import Timer from "./Components/Timer";
import PreparingScreen from "./Components/PreparingScreen";
import Main from "./Components/Main";

const SEC_PER_QUESTION = 30;

const questionPoints = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const categoriesName = {
  18: "Computer Science",
  19: "Mathematics",
  21: "Sports",
  22: "Geography",
  23: "History",
};

const initialState = {
  questions: [],
  status: "prepare",
  errorMessage: "",
  currentQues: 0,
  answer: null,
  score: 0,
  highScore: 0,
  secondsRemaining: null,
  category: 18,
  numOfQuestions: 10,
  difficulty: "any",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "dataSuccess":
      return {
        ...state,
        questions: payload,
        status: "ready",
        errorMessage: "",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
        errorMessage: payload,
      };
    case "prepareQuiz":
      return {
        ...state,
        status: "loading",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
        currentQues: 0,
        answer: null,
        score: 0,
      };
    case "selectAnswer":
      const question = state.questions.at(state.currentQues);

      const points = questionPoints[question.difficulty];
      return {
        ...state,
        answer: payload,
        score:
          payload === question.correct_answer
            ? state.score + points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQues: state.currentQues + 1,
        answer: null,
      };
    case "submitQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restartQuiz":
      return {
        ...state,
        status: "ready",
      };
    case "exitQuiz":
      return {
        ...state,
        status: "prepare",
        highScore: 0,
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "setCategory":
      return {
        ...state,
        category: payload,
      };
    case "setNumOfQuestions":
      return {
        ...state,
        numOfQuestions: payload,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: payload,
      };
    default:
      throw new Error("Unkown Action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      errorMessage,
      currentQues,
      answer,
      score,
      highScore,
      secondsRemaining,
      category,
      numOfQuestions,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossibleScore = questions.reduce(
    (prev, cur) => prev + questionPoints[cur.difficulty],
    0
  );

  async function fetchQuestions(category, numOfQuestions, difficulty) {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}${
          difficulty !== "any" ? `&difficulty=${difficulty}` : ""
        }&type=multiple`
      );

      if (!res.ok) throw new Error("Something went wrong, Please try again...");

      const data = await res.json();
      if (data.response_code === 5)
        throw new Error("Too many requests, Try again later");

      if (data.response_code !== 0)
        throw new Error("There was an error fetching questions.");

      dispatch({ type: "dataSuccess", payload: data.results });
    } catch (err) {
      dispatch({ type: "dataFailed", payload: err.message });
    }
  }

  useEffect(() => {
    if (status === "loading")
      fetchQuestions(category, numOfQuestions, difficulty);
  }, [status, category, numOfQuestions, difficulty]);

  return (
    <div className="app d-flex flex-column">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && (
          <ErrorContainer dispatch={dispatch}>{errorMessage}</ErrorContainer>
        )}
        {status === "prepare" && (
          <PreparingScreen
            numOfQuestions={numOfQuestions}
            difficulty={difficulty}
            dispatch={dispatch}
            category={category}
            categoriesName={categoriesName}
          />
        )}
        {status === "ready" && (
          <StartScreen
            numQuestions={numOfQuestions}
            category={category}
            categoriesName={categoriesName}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numOfQuestions}
              currentQues={currentQues}
              score={score}
              maxScore={maxPossibleScore}
              answer={answer}
            />
            <Question
              question={questions.at(currentQues)}
              dispatch={dispatch}
              answer={answer}
            />
            <div>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <Button
                answer={answer}
                currentQues={currentQues}
                numQuestions={numOfQuestions}
                dispatch={dispatch}
              />
            </div>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              score={score}
              maxScore={maxPossibleScore}
              highScore={highScore}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}
