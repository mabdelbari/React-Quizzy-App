import useQuiz from "../hooks/useQuiz";

function ErrorContainer() {
  const { errorMessage, dispatch } = useQuiz();

  return (
    <>
      <p className="error">
        <span>💥</span> {errorMessage}
      </p>

      <button
        className="btn btn-ui float-none mx-auto"
        onClick={() => dispatch({ type: "exitQuiz" })}
      >
        Try again
      </button>
    </>
  );
}

export default ErrorContainer;
