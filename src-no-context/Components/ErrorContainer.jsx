function ErrorContainer({ children, dispatch }) {
  return (
    <>
      <p className="error">
        <span>💥</span> {children}
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
