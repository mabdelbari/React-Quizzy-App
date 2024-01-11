import React from "react";
import useQuiz from "../hooks/useQuiz";

export default function PreparingScreen() {
  const { category, categoriesName, numOfQuestions, difficulty, dispatch } =
    useQuiz();

  return (
    <>
      <h2 className="text-center">
        Challenge Your Knowledge and Test Your Skills - Dive into the World of
        Quizzes!
      </h2>
      <h4 className="text-center">
        Select your preferences to start your quiz immediately
      </h4>

      <form className="d-flex flex-column row-gap-3">
        <div>
          <label>Select Category</label>
          <select
            value={category}
            className="mb-4"
            onChange={(e) =>
              dispatch({
                type: "setCategory",
                payload: Number(e.target.value),
              })
            }
          >
            {Object.keys(categoriesName).map((category) => (
              <option key={category} value={category}>
                {categoriesName[category]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Questions: </label>
          <select
            value={numOfQuestions}
            className="mb-4"
            onChange={(e) =>
              dispatch({
                type: "setNumOfQuestions",
                payload: Number(e.target.value),
              })
            }
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 100} value={i * 10 + 10}>
                {i * 10 + 10}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) =>
              dispatch({
                type: "setDifficulty",
                payload: e.target.value,
              })
            }
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          className="btn btn-ui w-100"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "prepareQuiz" });
          }}
        >
          Prepare Quiz
        </button>
      </form>
    </>
  );
}
