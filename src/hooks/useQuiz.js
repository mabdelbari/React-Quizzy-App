import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export default function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}
